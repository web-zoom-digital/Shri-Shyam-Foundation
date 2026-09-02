"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Example Schema for a Contact/Volunteer Form
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
  // Honeypot field for spam bots
  botField: z.string().max(0, "Bot detected").optional()
})

export type ContactFormData = z.infer<typeof contactSchema>

interface SecureFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  title?: string
  subtitle?: string
}

export function SecureForm({ onSubmit, title = "Get in Touch", subtitle = "We typically reply within 24 hours." }: SecureFormProps) {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const processSubmit = async (data: ContactFormData) => {
    try {
      setError(null)
      // If the honeypot field is filled out, silently reject as it's a bot
      if (data.botField) {
        throw new Error("Spam detected")
      }
      
      await onSubmit(data)
      setIsSuccess(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError("An error occurred while submitting. Please try again.")
    }
  }

  return (
    <div className="premium-card p-8 sm:p-10 relative overflow-hidden">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{subtitle}</p>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-slate-800">
              Message sent successfully! We will get back to you soon.
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(processSubmit)} className="space-y-5 relative">
        {/* Honeypot field (hidden from real users, visible to bots) */}
        <input
          type="text"
          {...register("botField")}
          className="absolute opacity-0 top-0 left-0 h-0 w-0 z-[-1]"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700">Full Name</label>
          <input 
            type="text" 
            {...register("name")}
            className={`w-full h-12 px-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.name ? 'border-red-300 focus:ring-red-500/30' : 'border-slate-200 focus:ring-slate-500/30'
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              {...register("email")}
              className={`w-full h-12 px-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-red-300 focus:ring-red-500/30' : 'border-slate-200 focus:ring-slate-500/30'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Phone Number</label>
            <input 
              type="tel" 
              {...register("phone")}
              className={`w-full h-12 px-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-red-300 focus:ring-red-500/30' : 'border-slate-200 focus:ring-slate-500/30'
              }`}
              placeholder="+91 9990145555"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700">How can we help?</label>
          <textarea 
            {...register("message")}
            rows={4}
            className={`w-full p-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
              errors.message ? 'border-red-300 focus:ring-red-500/30' : 'border-slate-200 focus:ring-slate-500/30'
            }`}
            placeholder="Tell us about your query or how you'd like to contribute..."
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending Request...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
        <p className="text-xs text-center text-slate-500 mt-4">
          Your information is secure and encrypted.
        </p>
      </form>
    </div>
  )
}
