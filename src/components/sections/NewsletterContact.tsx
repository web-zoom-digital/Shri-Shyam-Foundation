"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MapPin, Phone, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const newsletterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  botField: z.string().max(0, "Bot detected").optional()
})

type NewsletterData = z.infer<typeof newsletterSchema>

export function NewsletterContact() {
  const [isSuccess, setIsSuccess] = React.useState(false)
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema)
  })

  const onSubmit = async (data: NewsletterData) => {
    if (data.botField) return
    const subject = encodeURIComponent("Newsletter subscription — Shri Shyam Foundation")
    const body = encodeURIComponent(
      `Please add me to the SSF newsletter.\n\nName: ${data.name}\nEmail: ${data.email}`
    )
    window.location.href = `mailto:shrishyamfoundation1@gmail.com?subject=${subject}&body=${body}`
    setIsSuccess(true)
    reset()
    setTimeout(() => setIsSuccess(false), 5000)
  }
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Newsletter Side */}
          <motion.div
            className="premium-card p-10 sm:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Stay Updated</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive weekly updates on our impact, upcoming events, and stories from the ground.
            </p>
            
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
                    Successfully subscribed! Welcome to the community.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <form className="flex flex-col gap-4 relative" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register("botField")}
                className="absolute opacity-0 top-0 left-0 h-0 w-0 z-[-1]"
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div className="relative">
                <input 
                  type="text" 
                  {...register("name")}
                  placeholder="Your Name"
                  className={`w-full h-14 pl-6 pr-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-300 focus:ring-red-500/30' : 'border-slate-200 focus:ring-slate-500/30'}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  {...register("email")}
                  placeholder="Email Address"
                  className={`w-full h-14 pl-6 pr-4 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-500/30' : 'border-slate-200 focus:ring-slate-500/30'}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <Button variant="primary" size="lg" className="w-full h-14 mt-2" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Subscribe <Send className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>
          </motion.div>

          {/* Contact Preview Side */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Get in Touch</h3>
              <p className="text-slate-600 leading-relaxed">
                Have questions about our programs, or want to collaborate on a CSR initiative? Our team is available 24/7.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Head Office</h5>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    House Number - J88 Gali No. 9/4 Pusta, <br /> Delhi, UP 110053
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Helpline Number</h5>
                  <p className="text-sm text-slate-600">
                    +91 9990145555 (Toll Free)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Email Us</h5>
                  <p className="text-sm text-slate-600">
                    shrishyamfoundation1@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
