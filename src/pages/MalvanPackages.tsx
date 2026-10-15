import { useState } from 'react'
import { CheckCircle2, Waves, Wind } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { WHATSAPP_NUMBER } from '../data/constants'
import { MALVAN_PACKAGES, MALVAN_ACTIVITIES } from '../data/packages'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

const ActivityIcon = ({ name }: { name: string }) => {
  if (name.toLowerCase().includes('scuba') || name.toLowerCase().includes('diving')) {
    return <Waves className="w-4 h-4" />
  }
  return <Wind className="w-4 h-4" />
}

export default function MalvanPackages() {
  return (
    <>
      <SEO 
        title="Malvan Packages" 
        description="Mangalmurti Scuba Diving packages in Malvan - Scuba diving, parasailing, jet ski, and water sports activities"
      />

      <div className="pt-24 pb-16 sm:pb-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              Malvan
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Sea King Scuba Diving - Malvan
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Experience the thrill of scuba diving and water sports
            </p>
          </motion.div>

          {/* Activities */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {MALVAN_ACTIVITIES.slice(0, 2).map((activity, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium shadow-sm min-h-[44px]"
                >
                  <ActivityIcon name={activity} />
                  <span>{activity}</span>
                </div>
              ))}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-soft/30 border border-teal/20 text-sm text-teal-dark font-bold shadow-sm min-h-[44px]">
                <Wind className="w-4 h-4" />
                <span>Water Sports (+4 rides)</span>
              </div>
            </div>
          </motion.div>

          {/* Packages */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {MALVAN_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className="relative bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-sand to-sand-warm text-white text-xs font-bold shadow-md">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-navy mb-4">{pkg.title}</h3>
                  <div className="inline-block">
                    <div className="text-4xl sm:text-5xl font-extrabold text-teal mb-1">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{pkg.unit}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book ${pkg.title} (Rs ${pkg.price}) at Malvan`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-teal text-white font-bold text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20 active:scale-[0.99] min-h-[44px]"
                >
                  <WhatsAppIcon size={16} />
                  <span>Book on WhatsApp</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
