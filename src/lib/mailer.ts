type SendEmailInput = {
  to: string | string[]
  subject: string
  html: string
  text: string
  /** Prevents duplicate Resend deliveries when webhook + client both confirm. */
  idempotencyKey?: string
}

function getFromAddress() {
  return (
    process.env.DONOR_FROM_EMAIL?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    "Shri Shyam Foundation <shrishyamfoundation1@gmail.com>"
  )
}

export function getAdminEmail() {
  return (
    process.env.ADMIN_EMAIL?.trim() ||
    process.env.DONATION_ADMIN_EMAIL?.trim() ||
    "shrishyamfoundation1@gmail.com"
  )
}

async function sendViaResend(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return false

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }
  if (input.idempotencyKey) {
    headers["Idempotency-Key"] = input.idempotencyKey.slice(0, 256)
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: getFromAddress(),
      to: Array.isArray(input.to) ? input.to : [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    console.error("Resend email failed:", res.status, body)
    return false
  }
  return true
}

async function sendViaSmtp(input: SendEmailInput) {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  if (!host || !user || !pass) return false

  try {
    const nodemailer = await import("nodemailer")
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: getFromAddress(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    })
    return true
  } catch (error) {
    console.error("SMTP email failed:", error)
    return false
  }
}

export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const viaResend = await sendViaResend(input)
  if (viaResend) return true

  const viaSmtp = await sendViaSmtp(input)
  if (viaSmtp) return true

  console.warn("[mailer] No email provider configured. Message preview:", {
    to: input.to,
    subject: input.subject,
    text: input.text.slice(0, 500),
  })
  // In development, treat as sent so the flow can be tested without SMTP keys.
  return process.env.NODE_ENV !== "production"
}

export type DonationEmailData = {
  orderId: string
  amount: number
  name: string
  email: string
  phone: string
  orderNote?: string
  want80G: boolean
  pan?: string
  address?: string
  paymentStatus?: string
}

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`
}

export async function sendDonorAndAdminDonationEmails(data: DonationEmailData) {
  const cause = data.orderNote || "General Donation"
  const eightyGBlock = data.want80G
    ? `
      <p><strong>80G Certificate:</strong> Yes</p>
      <p><strong>PAN:</strong> ${data.pan || "—"}</p>
      <p><strong>Address:</strong> ${data.address || "—"}</p>
    `
    : `<p><strong>80G Certificate:</strong> No</p>`

  const donorHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="color:#1d4ed8;margin:0 0 12px">Thank you for your donation</h2>
      <p>Dear ${data.name},</p>
      <p>We received your donation of <strong>${formatAmount(data.amount)}</strong> to Shri Shyam Foundation.</p>
      <p><strong>Order ID:</strong> ${data.orderId}<br/>
      <strong>Cause:</strong> ${cause}<br/>
      <strong>Mobile:</strong> ${data.phone}</p>
      ${eightyGBlock}
      <p>${
        data.want80G
          ? "Our team will process your 80G tax certificate and share it by email shortly."
          : "If you need an 80G certificate later, reply to this email with your PAN and address."
      }</p>
      <p>With gratitude,<br/>Shri Shyam Foundation</p>
    </div>
  `

  const donorText = [
    `Thank you for your donation, ${data.name}.`,
    `Amount: ${formatAmount(data.amount)}`,
    `Order ID: ${data.orderId}`,
    `Cause: ${cause}`,
    `Mobile: ${data.phone}`,
    data.want80G
      ? `80G: Yes | PAN: ${data.pan || "—"} | Address: ${data.address || "—"}`
      : "80G: No",
  ].join("\n")

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 12px">New donation received</h2>
      <p><strong>Amount:</strong> ${formatAmount(data.amount)}<br/>
      <strong>Order ID:</strong> ${data.orderId}<br/>
      <strong>Status:</strong> ${data.paymentStatus || "SUCCESS"}<br/>
      <strong>Cause:</strong> ${cause}</p>
      <p><strong>Donor:</strong> ${data.name}<br/>
      <strong>Email:</strong> ${data.email}<br/>
      <strong>Mobile:</strong> ${data.phone}</p>
      ${eightyGBlock}
    </div>
  `

  const adminText = [
    "New donation received",
    `Amount: ${formatAmount(data.amount)}`,
    `Order ID: ${data.orderId}`,
    `Donor: ${data.name} | ${data.email} | ${data.phone}`,
    `Cause: ${cause}`,
    data.want80G
      ? `80G: Yes | PAN: ${data.pan || "—"} | Address: ${data.address || "—"}`
      : "80G: No",
  ].join("\n")

  const [donorOk, adminOk] = await Promise.all([
    sendEmail({
      to: data.email,
      subject: `Donation received — ${formatAmount(data.amount)} | Shri Shyam Foundation`,
      html: donorHtml,
      text: donorText,
      idempotencyKey: `ncf-donor-${data.orderId}`,
    }),
    sendEmail({
      to: getAdminEmail(),
      subject: `New donation ${formatAmount(data.amount)} — ${data.name}`,
      html: adminHtml,
      text: adminText,
      idempotencyKey: `ncf-admin-${data.orderId}`,
    }),
  ])

  return { donorOk, adminOk }
}
