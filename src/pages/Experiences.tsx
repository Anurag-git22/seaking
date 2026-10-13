import { Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { EXPERIENCES, WHATSAPP_NUMBER } from '../data/constants'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

export default function Experiences() {
  return (
    <>
      <SEO 
        title="Experiences" 
        description="Explore 8 signature boat safari tours in Malvan - Sangam Point, Tsunami Island, Dolphin Safari, and more. Book your adventure today!"
      />

      <div className="pt-24 pb-16 sm:pb-24 bg-slate-100/70 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center max-w-xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              <Waves className="w-3.5 h-3.5" />
              Signature Tours
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Experiences
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Handcrafted boat tours across pristine Konkan waters
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                aria-label={`Tour ${index + 1} of ${EXPERIENCES.length}: ${exp.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 to-navy/20">
                  <img
                    src={exp.image}
                    alt={`${exp.title} boat safari experience in Malvan`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md">
                    {exp.tag}
                  </span>

                  <div className="absolute bottom-3 left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 flex items-center justify-center shadow-md ring-2 ring-white" aria-hidden="true">
                    <span className="text-teal font-bold text-xs sm:text-sm tabular-nums">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-navy group-hover:text-teal transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book the ${exp.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl text-white bg-teal hover:bg-teal-dark transition-colors focus:outline-none focus:ring-2 focus:ring-teal active:scale-[0.99]"
                    >
                      <WhatsAppIcon size={14} className="shrink-0" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}
