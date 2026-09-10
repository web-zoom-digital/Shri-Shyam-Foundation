"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if ((window as any).Razorpay) return resolve(true)

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function useRazorpayCheckout() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [paymentError, setPaymentError] = React.useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = React.useState<string | null>(null)

  const clearPaymentError = React.useCallback(() => setPaymentError(null), [])
  const clearPaymentSuccess = React.useCallback(() => setPaymentSuccess(null), [])

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
          setIsProcessing(false)
          return { ok: false, error: message, fallbackTo: data.fallbackTo }
        }

        if (data.manualPayment) {
          router.push(data.redirectTo || "/account-details")
          setIsProcessing(false)
          return { ok: true }
        }

        if (!data.razorpay_order_id) {
          throw new Error("Payment session was not created.")
        }

        const isLoaded = await loadRazorpayScript()
        if (!isLoaded) {
          throw new Error("Razorpay SDK failed to load. Check your connection.")
        }

        return new Promise<CheckoutResult>((resolve) => {
          const options = {
            key: data.key_id,
            amount: data.amount,
            currency: data.currency,
            name: data.name,
            description: data.description,
            order_id: data.razorpay_order_id,
            prefill: data.prefill,
            handler: async function (response: any) {
              try {
                const verifyRes = await fetch("/api/verify-payment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  })
                })
                
                const verifyData = await verifyRes.json()
                if (verifyRes.ok && verifyData.ok) {
                   trackMetaEvent("Donate", {
                     value: amount,
                     currency: "INR",
                     content_name: orderNote || "Donation",
                     order_id: response.razorpay_order_id,
                   })
                   setPaymentSuccess("Payment received. Confirmation emails have been sent to you and our team.")
                   resolve({ ok: true, orderId: response.razorpay_order_id, emailsSent: true })
                   
                   // optional: redirect to returnPath
                   router.replace(returnPath)
                } else {
                   setPaymentError(verifyData.error || "Payment verification failed.")
                   resolve({ ok: false, error: verifyData.error })
                }
              } catch (err) {
                 console.error("Verification error", err)
                 setPaymentError("Could not verify payment.")
                 resolve({ ok: false, error: "Could not verify payment." })
              } finally {
                 setIsProcessing(false)
              }
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false)
                setPaymentError("Payment cancelled by user.")
                resolve({ ok: false, error: "Payment cancelled by user." })
              }
            },
            theme: {
              color: "#334155" // slate-700 to match theme
            }
          }

          const rzp = new (window as any).Razorpay(options)
          rzp.on("payment.failed", function (response: any) {
            setIsProcessing(false)
            setPaymentError(`Payment failed: ${response.error.description}`)
            resolve({ ok: false, error: response.error.description })
          })
          rzp.open()
        })

      } catch (error) {
        console.error(error)
        const message =
          error instanceof Error ? error.message : "Something went wrong initializing payment."
        setPaymentError(message)
        setIsProcessing(false)
        return { ok: false, error: message }
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
