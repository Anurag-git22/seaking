import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Star, Clock, CheckCircle2, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { WHATSAPP_NUMBER, PHONE_NUMBER, EXPERIENCES, GALLERY_ITEMS } from '../data/constants'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

export default function Home() {
  const { ref: statsRef, isInView: statsInView } = useInView()
  const reviewCount = useCountUp(200, 2000, statsInView)

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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-teal-soft mb-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-teal-light">
              <img src="/images/Head.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span>Malvan, Maharashtra</span>
            <span className="text-white/40">•</span>
            <span>Devbag & Tarkarli</span>
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

      {/* CTA BANNER */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready for Your Adventure?
          </h2>
          <p className="text-lg sm:text-xl text-teal-soft mb-8">
            Book your Malvan boat safari today
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I want to book a Sea King Safari tour.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-teal font-bold text-lg hover:bg-slate-100 transition-all shadow-xl active:scale-95"
          >
            <WhatsAppIcon size={24} />
            <span>Book on WhatsApp</span>
          </a>
        </div>
      </section>
    </>
  )
}
