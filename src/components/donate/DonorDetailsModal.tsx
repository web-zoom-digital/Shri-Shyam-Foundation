"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, ShieldCheck, Heart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {

  donorDetailsSchema,
  type DonorDetails,
  type DonorDetailsInput,
} from "@/lib/donorSchema"

type Props = {
  open: boolean
  amount: number
  causeLabel?: string
  isSubmitting?: boolean
  onClose: () => void
  onSubmit: (data: DonorDetails) => void | Promise<void>
}

export function DonorDetailsModal({
  open,
  amount,
  causeLabel = "Donation",
  isSubmitting = false,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DonorDetailsInput>({
    resolver: zodResolver(donorDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      want80G: "no",
      pan: "",
      address: "",
    },
  })

  const want80G = watch("want80G")

  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  React.useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        aria-label="Close donor form"
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"
        onClick={onClose}
        disabled={isSubmitting}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donor-form-title"
        className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 px-5 sm:px-6 py-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Almost there
            </p>
            <h2 id="donor-form-title" className="text-xl font-extrabold text-slate-900 leading-tight">
              Donor details before payment
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {causeLabel} · ₹{amount > 0 ? amount.toLocaleString("en-IN") : "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          className="px-5 sm:px-6 py-5 space-y-4"
          onSubmit={handleSubmit(async (values) => {
            const parsed = donorDetailsSchema.parse(values)
            await onSubmit(parsed)
          })}
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("name")}
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Your full name"
              autoComplete="name"
            />
            {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("phone")}
              type="tel"
              inputMode="numeric"
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="10-digit mobile number"
              autoComplete="tel"
            />
            {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className="rounded-2xl border-2 border-slate-200 p-4 bg-slate-50">
            <p className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              Want 80G Certificate? <span className="text-rose-500">*</span>
            </p>
            <div className="flex gap-3">
              {(["no", "yes"] as const).map((value) => (
                <label
                  key={value}
                  className={`flex-1 cursor-pointer rounded-xl border-2 px-4 py-3 text-center font-bold text-sm transition-all ${
                    want80G === value
                      ? "border-slate-600 bg-slate-600 text-white"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <input
                    {...register("want80G")}
                    type="radio"
                    value={value}
                    className="sr-only"
                  />
                  {value === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>

          {want80G === "yes" && (
            <div className="space-y-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  PAN Number <span className="text-rose-500">*</span>
                </label>
                <input
                  {...register("pan")}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-medium uppercase tracking-wider text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  autoComplete="off"
                />
                {errors.pan && <p className="text-rose-600 text-xs mt-1">{errors.pan.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-none"
                  placeholder="Full postal address for 80G certificate"
                />
                {errors.address && (
                  <p className="text-rose-600 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || amount <= 0}
              className="w-full rounded-full h-12 font-bold text-base"
            >
              {isSubmitting ? "Opening secure payment..." : `Proceed to Pay ₹${amount.toLocaleString("en-IN")}`}
              {!isSubmitting && <Heart className="w-4 h-4 ml-2 fill-white" />}
            </Button>
            <p className="text-center text-[11px] text-slate-400">
              Your details are used for payment receipt{want80G === "yes" ? " and 80G certificate" : ""}.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
