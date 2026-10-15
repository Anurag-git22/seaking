import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Star, Clock, CheckCircle2, ShieldCheck, User, Calendar, Loader2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { WHATSAPP_NUMBER, PHONE_NUMBER, EXPERIENCES, GALLERY_ITEMS } from '../data/constants'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { useState } from 'react'

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxW3HYs_VNnQ67Zw5zd-2P3SzUG09ZDc8ygOlFvei0Vvg1cO3FBnKbsKLSHUpoiOl9U/exec'

export default function Home() {
  const { ref: statsRef, isInView: statsInView } = useInView()
  const reviewCount = useCountUp(200, 2000, statsInView)

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    experience: 'Tsunami Island'
  })

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    if (isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const formBody = new URLSearchParams({
        'name': formData.name,
        'phone': formData.phone,
        'date': formData.date || 'Flexible',
        'experience': formData.experience
      }).toString()

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        redirect: 'follow'
      })

      if (!response.ok && response.type !== 'opaque') {
        throw new Error('Submission failed')
      }

      await new Promise(resolve => setTimeout(resolve, 1000))

      const msg = `*New Safari Enquiry - Sea King Malvan*%0A• *Name:* ${encodeURIComponent(formData.name)}%0A• *Phone:* ${encodeURIComponent(formData.phone)}%0A• *Date:* ${encodeURIComponent(formData.date || 'Flexible')}%0A• *Experience:* ${encodeURIComponent(formData.experience)}`
      
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      
      setFormSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        date: '',
        experience: 'Tsunami Island'
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Failed to submit enquiry. Please try WhatsApp directly or call us.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="Home" 
        description="Sea King Boating Safari - Backwaters, Dolphins & Island Adventures in Malvan, Maharashtra. Book your boat tour now!"
      />

      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[580px] max-h-[820px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/images/Scuba-enhanced.jpg"
            alt="Sea King Boating Safari in Malvan"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white pt-20">
<motion.div 
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-teal-soft mb-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white p-[2px] ring-1 ring-white/40 flex-shrink-0">
                <img
                  src="/images/logo-icon.png"
                  alt="Sea King logo"
                  width="512"
                  height="512"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-xs leading-tight">
                Malvan, Maharashtra
              </span>
              <span className="text-white/40">•</span>
              <span className="text-[11px] sm:text-xs leading-tight max-[359px]:text-[10px]">
                Devbag & Tarkarli
              </span>
            </motion.div>

          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sea King Boating Safari
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-2xl md:text-3xl font-light text-slate-100 max-w-2xl mx-auto mb-9 tracking-wide drop-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Backwaters. Dolphins. Island adventures.
          </motion.p>

          <motion.div 
            className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex-1 max-w-[210px] h-14 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 rounded-2xl bg-white text-navy font-bold text-sm sm:text-base whitespace-nowrap hover:bg-slate-100 transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <Phone className="w-5 h-5 text-teal shrink-0" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King! I would like to book a safari.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[210px] h-14 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 rounded-2xl bg-teal text-white font-bold text-sm sm:text-base whitespace-nowrap hover:bg-teal-dark transition-all shadow-lg shadow-teal/30 active:scale-95 border border-teal-light/30 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <WhatsAppIcon size={20} className="shrink-0" />
              <span>Book on WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section ref={statsRef} className="bg-white border-b border-slate-100 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-10 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sand">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sand text-sand" />
                ))}
              </div>
              <span className="text-navy font-bold text-sm sm:text-base">5.0</span>
              <span className="text-slate-500 font-normal">rating</span>
            </div>
            <span className="hidden sm:inline-block text-slate-300">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal" />
              <span className="text-navy font-bold text-sm sm:text-base tabular-nums">
                {reviewCount}+
              </span>
              <span className="text-slate-500 font-normal">verified reviews</span>
            </div>
            <span className="hidden sm:inline-block text-slate-300">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal" />
              <span className="text-navy font-bold text-sm sm:text-base">Open 7 days</span>
            </div>
            <span className="hidden md:inline-block text-slate-300">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span className="text-xs font-medium">Life Jackets Provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCES PREVIEW */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
            Signature Tours
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
            Popular Experiences
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Handcrafted boat tours across pristine Konkan waters
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {EXPERIENCES.slice(0, 4).map((exp, index) => (
            <div
              key={exp.id}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md">
                  {exp.tag}
                </span>
                <div className="absolute bottom-3 left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 flex items-center justify-center shadow-md ring-2 ring-white">
                  <span className="text-teal font-bold text-xs sm:text-sm tabular-nums">{index + 1}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-navy mb-1">{exp.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal text-white font-bold hover:bg-teal-dark transition-colors shadow-md"
          >
            <span>View All 8 Tours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-teal-soft/5 via-white to-teal-soft/10 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Scuba Diving & Boating Packages
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Explore our curated packages for Malvan and Devbag
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Malvan Card */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/Scuba.webp"
                  alt="Malvan Scuba Diving"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Malvan</h3>
                  <p className="text-teal-soft text-sm font-medium">Scuba & Water Sports</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">
                  Experience scuba diving and thrilling water sports including parasailing, jet ski, and bumper rides.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-teal font-bold text-2xl">₹999</span>
                    <span className="text-slate-500 text-xs ml-1">onwards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Devbag Card */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/boating.jpg"
                  alt="Devbag Boating"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Devbag</h3>
                  <p className="text-teal-soft text-sm font-medium">Boating Tours</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">
                  Family-friendly boat tours to Tsunami Island, mangrove safari, dolphin point, and scenic beaches.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-teal font-bold text-2xl">₹900</span>
                    <span className="text-slate-500 text-xs ml-1">onwards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal text-white font-bold hover:bg-teal-dark transition-colors shadow-md"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-16 sm:py-24 bg-slate-100/70 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-sand-light text-sand-warm text-xs font-bold tracking-wide uppercase mb-3">
              Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Moments on the Water
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {GALLERY_ITEMS.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-bold hover:bg-navy-light transition-colors shadow-md"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              Quick Booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Book Your Safari
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Fill in your details and we'll connect via WhatsApp
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg max-w-2xl mx-auto">
            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-teal-soft border border-teal text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
                <h3 className="font-bold text-navy text-lg">Enquiry Submitted!</h3>
                <p className="text-sm text-slate-700">Your booking request has been saved and sent via WhatsApp.</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-teal-dark font-bold underline hover:no-underline pt-2"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="e.g. Rahul Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isSubmitting}
                        placeholder="e.g. 98220 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        disabled={isSubmitting}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Selected Experience</label>
                  <select
                    value={formData.experience}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {EXPERIENCES.map((exp) => (
                      <option key={exp.id} value={exp.title}>{exp.title}</option>
                    ))}
                    <option value="Custom Package">Custom Package</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal text-white font-bold text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon size={16} />
                      <span>Check Availability on WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
