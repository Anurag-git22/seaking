import { useState } from 'react'
import { Phone, User, Calendar, CheckCircle2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { PHONE_NUMBER, PHONE_DISPLAY, WHATSAPP_NUMBER, INSTAGRAM_URL, EXPERIENCES } from '../data/constants'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    experience: 'Tsunami Island'
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return

    const msg = `*New Safari Enquiry - Sea King Malvan*%0A• *Name:* ${encodeURIComponent(formData.name)}%0A• *Phone:* ${encodeURIComponent(formData.phone)}%0A• *Date:* ${encodeURIComponent(formData.date || 'Flexible')}%0A• *Experience:* ${encodeURIComponent(formData.experience)}`
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    setFormSubmitted(true)
  }

  return (
    <>
      <SEO 
        title="Contact" 
        description="Contact Sea King Boating Safari for booking inquiries, tour information, and customer support. Call or WhatsApp us for instant booking assistance."
      />

      <div className="pt-24 pb-16 sm:pb-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              <Phone className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Book Your Safari
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Call or WhatsApp us for instant availability, rates, and packages
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: Quick Contact */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-teal-soft/30 border border-teal/20 shadow-sm">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-teal/30 shadow-sm bg-navy">
                  <img src="/images/Head.jpg" alt="Sea King Board" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[11px] text-teal-dark font-bold uppercase tracking-wider block">
                    Registered Safari Center
                  </span>
                  <span className="text-sm font-extrabold text-navy block">Dinu Kasavkar</span>
                  <span className="text-xs text-slate-600 block">Sea King Boating • Devbag, Tarkarli</span>
                </div>
              </div>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal hover:bg-white transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center group-hover:bg-teal transition-colors">
                    <Phone className="w-5 h-5 text-sand" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Direct Phone</span>
                    <span className="text-base font-bold text-navy">{PHONE_DISPLAY}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King! I would like to enquire about safari bookings.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-teal-soft/40 border border-teal/20 hover:border-teal hover:bg-teal-soft/70 transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-teal text-white flex items-center justify-center shadow-sm">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-teal-dark font-medium block">WhatsApp Chat</span>
                    <span className="text-base font-bold text-teal-dark">Instant Booking</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-teal group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sand hover:bg-white transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sand to-sand-warm text-white flex items-center justify-center shadow-sm">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Follow On Instagram</span>
                    <span className="text-base font-bold text-navy">@seakingboatingsafari</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sand-warm group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>

            {/* Right: Enquiry Form */}
            <motion.div 
              className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-navy mb-1">Quick Enquiry</h2>
              <p className="text-xs text-slate-500 mb-6">Fill details to send a booking request via WhatsApp</p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-teal-soft border border-teal text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
                  <h3 className="font-bold text-navy text-lg">Enquiry Generated!</h3>
                  <p className="text-sm text-slate-700">Your details have been sent via WhatsApp.</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-teal-dark font-bold underline hover:no-underline pt-2"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Your Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Patil"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 98220 12345"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Selected Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                    >
                      {EXPERIENCES.map((exp) => (
                        <option key={exp.id} value={exp.title}>{exp.title}</option>
                      ))}
                      <option value="Custom Package">Custom Package</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal text-white font-bold text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20 active:scale-[0.99]"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Check Availability on WhatsApp</span>
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </>
  )
}
