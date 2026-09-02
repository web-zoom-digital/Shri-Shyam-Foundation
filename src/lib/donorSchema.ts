import { z } from "zod"

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/

export const donorDetailsSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(120, "Name is too long"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email")
      .max(160, "Email is too long"),
    phone: z
      .string()
      .trim()
      .transform((v) => {
        // Strip all non-digits first (+91 becomes 91, etc.)
        const digits = v.replace(/\D/g, "")
        // Remove leading country code: 91XXXXXXXXXX (12 digits) → XXXXXXXXXX
        if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2)
        // Handle rare 13-digit entry like 0091XXXXXXXXXX
        if (digits.length === 13 && digits.startsWith("0091")) return digits.slice(4)
        return digits
      })
      .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
    want80G: z.enum(["yes", "no"]),
    pan: z.string().trim().optional().default(""),
    address: z.string().trim().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.want80G !== "yes") return

    const pan = (data.pan || "").toUpperCase()
    if (!panRegex.test(pan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pan"],
        message: "Enter a valid PAN (e.g. ABCDE1234F)",
      })
    }

    if (!(data.address || "").trim() || (data.address || "").trim().length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "Please enter your full address for the 80G certificate",
      })
    }
  })
  .transform((data) => ({
    ...data,
    pan: data.want80G === "yes" ? (data.pan || "").toUpperCase() : "",
    address: data.want80G === "yes" ? (data.address || "").trim() : "",
  }))

export type DonorDetailsInput = z.input<typeof donorDetailsSchema>
export type DonorDetails = z.output<typeof donorDetailsSchema>

export type DonorCheckoutPayload = DonorDetails & {
  amount: number
  returnPath?: string
  orderNote?: string
}
