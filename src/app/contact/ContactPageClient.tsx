"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, ChevronDown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

const faqs = [
  { q: "How quickly do you respond to messages?", a: "We respond to all emails and form submissions within 24 hours on working days. For urgent matters, please call or WhatsApp us directly." },
  { q: "Can I visit your operations centre?", a: "Yes! We welcome visitors every Tuesday and Friday between 10am–4pm. Please send an email in advance so we can arrange a proper tour." },
  { q: "How do I register as a volunteer?", a: "Fill out the Volunteer Form on this page or contact us directly. We conduct volunteer orientations on the second Saturday of every month." },
  { q: "I want to donate food or clothing. How do I arrange that?", a: "Call our helpline or WhatsApp us. We will arrange a convenient pickup or guide you to our nearest collection point." },
]

export function ContactPageClient() {
  const [formData, setFormData] = React.useState({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" })
  const [submitted, setSubmitted] = React.useState(false)
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Website] ${formData.subject} — ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:shrishyamfoundation1@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="bg-white w-full max-w-full overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-28 sm:pt-36 lg:pt-56 pb-20 overflow-hidden gradient-hero">
        <motion.div className="absolute top-20 right-0 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-slate-100 rounded-full blur-3xl opacity-40 translate-x-1/3"
          animate={{ x: [0, 16, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600 font-semibold">Contact Us</span>
          </nav>
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-6">
              <MessageSquare className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-semibold text-slate-800">We'd Love to Hear From You</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Let's Build <span className="text-gradient-primary">Impact</span><br />
              Together
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Whether you want to donate, volunteer, partner with us, or simply learn more — our team is here and ready to connect. Reach out in whatever way is most convenient for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: MapPin, title: "Visit Us", lines: ["House Number - J88 Gali No. 9/4 Pusta", "Delhi, UP 110053"], color: "from-slate-600 to-slate-400", action: null },
              { icon: Phone, title: "Call Us", lines: ["+91 9990145555", "Mon–Sat, 9am–7pm"], color: "from-slate-600 to-slate-400", action: "tel:+919990145555" },
              { icon: Mail, title: "Email Us", lines: ["shrishyamfoundation1@gmail.com", "Reply within 24 hours"], color: "from-orange-500 to-amber-400", action: "mailto:shrishyamfoundation1@gmail.com" },
              {
                icon: () => (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                ),
                title: "WhatsApp", lines: ["+91 9990145555", "Quick responses"], color: "from-[#25D366] to-[#128C7E]", action: "https://wa.me/919990145555"
              },
            ].map((c, i) => {
              const Icon = c.icon
              const card = (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                  className="premium-card p-7 rounded-2xl group hover:scale-105 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                  {c.lines.map((l, j) => <p key={j} className={j === 0 ? "text-slate-700 font-medium text-sm" : "text-slate-500 text-xs"}>{l}</p>)}
                </motion.div>
              )
              return c.action ? <a key={i} href={c.action} target={c.action.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{card}</a> : card
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="section-spacing bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Contact Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 mb-8">Fill out the form and a member of our team will get back to you within 24 hours.</p>

              {submitted ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. We will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input required type="text" placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input required type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all" />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="tel" placeholder="+91 9990145555" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Subject</label>
                      <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all">
                        <option>General Enquiry</option>
                        <option>Donation Help</option>
                        <option>Volunteer Interest</option>
                        <option>Corporate Partnership</option>
                        <option>Media / Press</option>
                        <option>Emergency Support</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Message *</label>
                    <textarea required placeholder="Tell us how we can help you..." rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none" />
                  </div>
                  <Button type="submit" variant="primary" className="w-full cursor-pointer rounded-full h-14 font-bold text-base shadow-lg shadow-slate-500/20">
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info Side */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" custom={0.2} viewport={{ once: true }} className="space-y-6">
              {/* Office Hours */}
              <div className="premium-card p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-600 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                    { day: "Saturday", time: "10:00 AM – 5:00 PM" },
                    { day: "Sunday", time: "Volunteer Activities Only" },
                  ].map((h, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600 font-medium text-sm">{h.day}</span>
                      <span className="text-slate-900 font-bold text-sm">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-7 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <h3 className="font-bold text-white text-lg">Emergency Helpline</h3>
                </div>
                <p className="text-orange-100 text-sm mb-4 leading-relaxed">For disaster-related emergencies or urgent food/medical assistance, our emergency line operates 24/7.</p>
                <a href="tel:+919990145555" className="inline-flex items-center gap-2 bg-white text-orange-600 font-black text-lg px-6 py-3 rounded-full hover:bg-orange-50 transition-colors">
                  <Phone className="w-5 h-5" /> +91 9990145555
                </a>
              </div>

              {/* Map Placeholder */}
              <div className="premium-card rounded-2xl overflow-hidden">
                <div className="h-52 bg-slate-100 flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="font-bold text-slate-700">House Number - J88 Gali No. 9/4 Pusta</p>
                    <p className="text-slate-500 text-sm">Delhi, UP 110053</p>
                  </div>
                </div>
                <div className="p-5">
                  <a href="https://www.google.com/maps/place/Govindgarh+-+Delhi+Rd,+Uttar+Pradesh+110053/@28.1310266,77.5362629,773m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390ccaec8fc350bb:0x17e057e461b70854!8m2!3d28.1310266!4d77.5362629!16s%2Fg%2F11bbrn830l?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-bold text-sm py-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <MapPin className="w-4 h-4" /> Open in Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-white">
        <div className="container-custom max-w-3xl">
          <SectionHeader badge="FAQs" title="Common Questions" subtitle="Quick answers to things people ask us most often." className="mb-12 text-center" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="premium-card rounded-2xl overflow-hidden">
                <button className="w-full text-left p-6 flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 hover:text-slate-600 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
