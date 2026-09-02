"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { load } from "@cashfreepayments/cashfree-js"
import type { DonorDetails } from "@/lib/donorSchema"
import { trackMetaEvent } from "@/components/analytics/MetaPixel"

type CheckoutOptions = {
  amount: number
  returnPath?: string
  orderNote?: string
  donor: DonorDetails
}

type CheckoutResult =
  | { ok: true; orderId?: string; emailsSent?: boolean }
  | { ok: false; error: string; fallbackTo?: string }

function isWhitelistError(message: string) {
  return /whitelist|not enabled|not approved|broken link|domain/i.test(message)
}

async function confirmDonationEmails(payload: {
  orderId: string
  amount: number
  donor: DonorDetails
  orderNote?: string
}) {
  try {
    const res = await fetch("/api/confirm-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: payload.orderId,
        amount: payload.amount,
        name: payload.donor.name,
        email: payload.donor.email,
        phone: payload.donor.phone,
        want80G: payload.donor.want80G === "yes",
        pan: payload.donor.pan,
        address: payload.donor.address,
        orderNote: payload.orderNote || "",
      }),
    })
    const data = await res.json().catch(() => ({}))
    return Boolean(res.ok && data?.ok)
  } catch (error) {
    console.error("Confirm donation email call failed:", error)
    return false
  }
}

export function useCashfreeCheckout() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [paymentError, setPaymentError] = React.useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = React.useState<string | null>(null)

  const clearPaymentError = React.useCallback(() => setPaymentError(null), [])
  const clearPaymentSuccess = React.useCallback(() => setPaymentSuccess(null), [])

  // Production return_url landing: confirm + email even if the modal closed via redirect.
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const orderId = params.get("order_id")?.trim()
    if (!orderId) return

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/confirm-donation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        })
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        if (res.ok && data?.ok) {
          setPaymentSuccess(
            "Payment received. Confirmation emails have been sent to you and our team."
          )
        }
      } catch (error) {
        console.error("Return-url donation confirm failed:", error)
      } finally {
        if (cancelled) return
        params.delete("order_id")
        const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`
        router.replace(next)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [router])

  const startCheckout = React.useCallback(
    async ({
      amount,
      returnPath = "/donate",
      orderNote,
      donor,
    }: CheckoutOptions): Promise<CheckoutResult> => {
      if (amount <= 0) {
        return { ok: false, error: "Please choose a valid donation amount." }
      }
      if (!donor) {
        return { ok: false, error: "Please fill donor details before payment." }
      }

      setIsProcessing(true)
      setPaymentError(null)
      setPaymentSuccess(null)

      try {
        trackMetaEvent("InitiateCheckout", {
          value: amount,
          currency: "INR",
          content_name: orderNote || "Donation",
        })

        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            returnPath,
            orderNote,
            name: donor.name,
            email: donor.email,
            phone: donor.phone,
            want80G: donor.want80G === "yes",
            pan: donor.pan,
            address: donor.address,
          }),
        })
        const data = await res.json()

        if (!res.ok) {
          const message =
            data.error ||
            "Online payment could not start. You can donate via UPI or bank transfer instead."
          setPaymentError(message)
          return { ok: false, error: message, fallbackTo: data.fallbackTo }
        }

        if (data.manualPayment) {
          router.push(data.redirectTo || "/account-details")
          return { ok: true }
        }

        if (!data.payment_session_id) {
          throw new Error("Payment session was not created.")
        }

        const paymentMode = (typeof data.mode === "string" ? data.mode : "production") as
          | "production"
          | "sandbox"
        const orderId = typeof data.order_id === "string" ? data.order_id : ""
        const cashfree = await load({ mode: paymentMode })
        const result = await cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          returnUrl: data.return_url,
          redirectTarget: "_modal",
        })

        if (result?.error?.message) {
          const message = result.error.message
          const friendly = isWhitelistError(message)
            ? "Online card/UPI checkout is not fully activated for this website domain yet (Cashfree whitelist pending). You can still donate instantly via UPI or bank transfer."
            : message
          setPaymentError(friendly)
          return { ok: false, error: friendly }
        }

        let emailsSent = false
        if (orderId && !result?.error) {
          trackMetaEvent("Donate", {
            value: amount,
            currency: "INR",
            content_name: orderNote || "Donation",
            order_id: orderId,
          })
          emailsSent = await confirmDonationEmails({
            orderId,
            amount,
            donor,
            orderNote,
          })
          if (emailsSent) {
            setPaymentSuccess(
              "Payment received. Confirmation emails have been sent to you and our team."
            )
          } else {
            setPaymentSuccess(
              "If your payment succeeded, you and our team will receive confirmation emails shortly. Check spam if needed."
            )
          }
        } else if (!result?.error) {
          trackMetaEvent("Donate", {
            value: amount,
            currency: "INR",
            content_name: orderNote || "Donation",
          })
          setPaymentSuccess("Payment flow completed. Thank you for supporting Shri Shyam Foundation.")
        }

        return { ok: true, orderId, emailsSent }
      } catch (error) {
        console.error(error)
        const message =
          error instanceof Error ? error.message : "Something went wrong initializing payment."
        const friendly = isWhitelistError(message)
          ? "Online checkout is blocked until this domain is approved in Cashfree. Please use UPI / bank transfer for now."
          : message
        setPaymentError(friendly)
        return { ok: false, error: friendly }
      } finally {
        setIsProcessing(false)
      }
    },
    [router]
  )

  return {
    isProcessing,
    paymentError,
    paymentSuccess,
    clearPaymentError,
    clearPaymentSuccess,
    startCheckout,
  }
}
