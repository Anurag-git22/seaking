import { useState } from 'react'
import { CheckCircle2, Waves, Wind, Clock, Droplet, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO } from '../components/SEO'
import { WHATSAPP_NUMBER } from '../data/constants'
import { MALVAN_PACKAGES, MALVAN_ACTIVITIES, DEVBAG_PACKAGES, KAYAK_PACKAGE } from '../data/packages'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

type LocationTab = 'malvan' | 'devbag'

const ActivityIcon = ({ name }: { name: string }) => {
  if (name.toLowerCase().includes('scuba') || name.toLowerCase().includes('diving')) {
    return <Waves className="w-4 h-4" />
  }
  return <Wind className="w-4 h-4" />
}

export default function Packages() {
  const [activeTab, setActiveTab] = useState<LocationTab>('malvan')
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set())

  const togglePackage = (id: string) => {
    setExpandedPackages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <>
      <SEO 
        title="Packages" 
        description="Scuba diving, water sports, and boating packages at Malvan and Devbag"
      />

      <div className="pt-24 pb-16 sm:pb-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              PACKAGES
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
              Choose Your Adventure
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Select between Malvan scuba diving or Devbag boating tours
            </p>
          </motion.div>

          {/* Location Tabs */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 shadow-sm" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'malvan'}
                onClick={() => setActiveTab('malvan')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 min-h-[44px] min-w-[120px] ${
                  activeTab === 'malvan'
                    ? 'bg-teal text-white shadow-md shadow-teal/30'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>Malvan</span>
                  <span className="text-[10px] font-medium opacity-90">Scuba & Water Sports</span>
                </div>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'devbag'}
                onClick={() => setActiveTab('devbag')}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 min-h-[44px] min-w-[120px] ${
                  activeTab === 'devbag'
                    ? 'bg-teal text-white shadow-md shadow-teal/30'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>Devbag</span>
                  <span className="text-[10px] font-medium opacity-90">Boating Tours</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'malvan' && (
              <motion.div
                key="malvan"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-navy mb-2">
                    Mangalmurti Scuba Diving - Malvan
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Experience the thrill of scuba diving and water sports
                  </p>
                </div>

                {/* Activities */}
                <div className="mb-12">
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
                </div>

                {/* Malvan Packages */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {MALVAN_PACKAGES.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      className="relative bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
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
              </motion.div>
            )}

            {activeTab === 'devbag' && (
              <motion.div
                key="devbag"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-navy mb-2">
                    Boating Packages - Devbag
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Family-friendly boating tours near Mahapurush Mandir
                  </p>
                </div>

                {/* Devbag Packages Grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  {DEVBAG_PACKAGES.map((pkg, index) => {
                    const isExpanded = expandedPackages.has(pkg.id)
                    const visibleItems = isExpanded ? pkg.items : pkg.items.slice(0, 4)
                    const hasMore = pkg.items.length > 4

                    return (
                      <motion.div
                        key={pkg.id}
                        className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                      >
                        <div className="inline-block mb-3">
                          <span className="inline-block px-3 py-1 rounded-full bg-teal-soft/30 text-teal-dark text-xs font-bold">
                            {pkg.type}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-navy mb-3">{pkg.title}</h3>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium mb-4 w-fit">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pkg.duration}</span>
                        </div>

                        <div className="mb-4">
                          <div className="text-3xl font-extrabold text-teal">
                            ₹{pkg.price.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div className="flex-1 mb-4">
                          <ul className="space-y-2">
                            {visibleItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                {item === 'Complimentary Bisleri' ? (
                                  <Droplet className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                )}
                                <span className={`text-xs ${item === 'Complimentary Bisleri' ? 'text-blue-600 font-semibold' : 'text-slate-700'}`}>
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {hasMore && (
                            <button
                              onClick={() => togglePackage(pkg.id)}
                              className="mt-3 inline-flex items-center gap-1 text-xs text-teal-dark font-bold hover:text-teal transition-colors min-h-[44px] px-2 py-1"
                              aria-expanded={isExpanded}
                            >
                              <span>{isExpanded ? 'View less' : 'View all stops'}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>

                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book ${pkg.title} (Rs ${pkg.price}) at Devbag`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-teal text-white font-bold text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20 active:scale-[0.99] min-h-[44px]"
                        >
                          <WhatsAppIcon size={16} />
                          <span>Book on WhatsApp</span>
                        </a>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Kayaking Package Strip */}
                <motion.div 
                  className="max-w-5xl mx-auto bg-gradient-to-br from-teal-soft/40 to-teal-soft/20 rounded-2xl border border-teal/20 p-6 sm:p-8 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-navy mb-2">{KAYAK_PACKAGE.title}</h3>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-700 text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{KAYAK_PACKAGE.duration}</span>
                        </div>
                        <div className="text-2xl font-extrabold text-teal">
                          ₹{KAYAK_PACKAGE.price.toLocaleString('en-IN')}
                          <span className="text-sm font-medium text-slate-600 ml-2">{KAYAK_PACKAGE.unit}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-slate-700">
                        {KAYAK_PACKAGE.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book ${KAYAK_PACKAGE.title} (Rs ${KAYAK_PACKAGE.price} ${KAYAK_PACKAGE.unit}) at Devbag`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-teal text-white font-bold text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20 active:scale-[0.99] min-h-[44px]"
                      >
                        <WhatsAppIcon size={16} />
                        <span>Book on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
