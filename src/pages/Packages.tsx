import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Waves, Wind, Clock, Droplet, ChevronDown, ChevronUp, Camera, MapPin, Palmtree } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { WHATSAPP_NUMBER } from '../data/constants'
import { MALVAN_PACKAGES, MALVAN_ACTIVITIES, DEVBAG_PACKAGES, KAYAK_PACKAGE } from '../data/packages'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

type LocationTab = 'malvan' | 'devbag'

const ActivityIcon = ({ name }: { name: string }) => {
  if (name.toLowerCase().includes('scuba') || name.toLowerCase().includes('diving')) {
    return (
      <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center mb-2">
        <Waves className="w-6 h-6 text-teal" />
      </div>
    )
  }
  return (
    <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center mb-2">
      <Wind className="w-6 h-6 text-teal" />
    </div>
  )
}

const AnimatedPrice = ({ price }: { price: number }) => {
  const [displayPrice, setDisplayPrice] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayPrice(price)
      return
    }

    const duration = 800
    const steps = 30
    const increment = price / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= price) {
        setDisplayPrice(price)
        clearInterval(timer)
      } else {
        setDisplayPrice(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [price, prefersReducedMotion])

  return <>₹{displayPrice.toLocaleString('en-IN')}</>
}

export default function Packages() {
  const [activeTab, setActiveTab] = useState<LocationTab>('malvan')
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set())
  const prefersReducedMotion = useReducedMotion()

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

      <div className="pt-24 pb-16 md:pb-24 bg-gradient-to-br from-teal-soft/5 via-white to-teal-soft/10 min-h-screen relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-teal-soft/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-4">
              PACKAGES
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight mb-4">
              Choose Your Adventure
            </h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Select between Malvan scuba diving or Devbag boating tours
            </p>
          </motion.div>

          {/* Enhanced Location Tabs */}
          <motion.div 
            className="flex justify-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative inline-flex rounded-3xl bg-white p-2 shadow-lg border border-slate-200" role="tablist">
              {/* Sliding indicator */}
              <motion.div
                className="absolute top-2 bottom-2 bg-teal rounded-2xl shadow-md"
                initial={false}
                animate={{
                  left: activeTab === 'malvan' ? '0.5rem' : '50%',
                  right: activeTab === 'malvan' ? '50%' : '0.5rem',
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
              />
              
              <button
                role="tab"
                aria-selected={activeTab === 'malvan'}
                onClick={() => setActiveTab('malvan')}
                className={`relative z-10 px-8 py-3 rounded-2xl font-bold text-[15px] transition-colors duration-300 min-h-[48px] min-w-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                  activeTab === 'malvan'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>Malvan</span>
                  <span className="text-[11px] font-medium opacity-90 mt-0.5">
                    Scuba & Water Sports
                  </span>
                </div>
              </button>
              
              <button
                role="tab"
                aria-selected={activeTab === 'devbag'}
                onClick={() => setActiveTab('devbag')}
                className={`relative z-10 px-8 py-3 rounded-2xl font-bold text-[15px] transition-colors duration-300 min-h-[48px] min-w-[140px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 ${
                  activeTab === 'devbag'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>Devbag</span>
                  <span className="text-[11px] font-medium opacity-90 mt-0.5">
                    Boating Tours
                  </span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Tab Content with fixed height container */}
          <div className="min-h-[800px]">
            <AnimatePresence mode="wait">
              {activeTab === 'malvan' && (
                <motion.div
                  key="malvan"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-navy mb-2">
                      Sea King Scuba Diving - Malvan
                    </h2>
                    <p className="text-slate-600 text-[15px]">
                      Experience the thrill of scuba diving and water sports
                    </p>
                  </div>

                  {/* Activities Grid */}
                  <div className="mb-14">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
                      {MALVAN_ACTIVITIES.slice(0, 2).map((activity, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <ActivityIcon name={activity} />
                          <span className="text-[13px] text-slate-700 font-medium leading-tight">
                            {activity}
                          </span>
                        </motion.div>
                      ))}
                      
                      {/* Water Sports grouped */}
                      {[...Array(4)].map((_, index) => (
                        <motion.div
                          key={`water-${index}`}
                          className="flex flex-col items-center text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: (2 + index) * 0.05 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center mb-2">
                            <Wind className="w-6 h-6 text-teal" />
                          </div>
                          <span className="text-[13px] text-slate-700 font-medium leading-tight">
                            {MALVAN_ACTIVITIES[2 + index]?.split(' ')[0] || 'Ride'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-center text-[13px] text-teal-dark font-semibold mt-4">
                      Water Sports (+4 rides)
                    </p>
                  </div>

                  {/* Malvan Packages */}
                  <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mb-8">
                    {MALVAN_PACKAGES.map((pkg, index) => {
                      const isPremium = pkg.badge === 'Best Experience'
                      const videoItem = pkg.items.find(item => item.toLowerCase().includes('video'))
                      const otherItems = pkg.items.filter(item => item.toLowerCase().includes('video') === false)
                      
                      return (
                        <motion.div
                          key={pkg.id}
                          className={`relative w-full max-w-md rounded-3xl p-8 shadow-lg transition-all duration-300 ${
                            isPremium 
                              ? 'bg-gradient-to-br from-navy via-navy to-navy-light text-white md:scale-105 ring-2 ring-teal/50 hover:ring-teal hover:shadow-teal/30' 
                              : 'bg-white border-2 border-slate-200 hover:border-teal/50'
                          } hover:-translate-y-1.5 hover:shadow-xl`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                          {/* Top accent strip */}
                          {!isPremium && (
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-soft via-teal to-teal-soft rounded-t-3xl flex items-center justify-center">
                              <Waves className="w-4 h-4 text-white -mt-1" />
                            </div>
                          )}

                          {/* Badge */}
                          {pkg.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold shadow-lg">
                                {pkg.badge}
                              </span>
                            </div>
                          )}

                          <div className="text-center mb-6 mt-2">
                            <h3 className={`text-[22px] font-bold mb-5 ${isPremium ? 'text-white' : 'text-navy'}`}>
                              {pkg.title}
                            </h3>
                            <div className="inline-block">
                              <div className={`text-[44px] font-extrabold mb-1 ${isPremium ? 'text-teal-soft' : 'text-teal'}`}>
                                <AnimatedPrice price={pkg.price} />
                              </div>
                              <div className={`text-[14px] font-medium ${isPremium ? 'text-slate-300' : 'text-slate-500'}`}>
                                {pkg.unit}
                              </div>
                            </div>
                          </div>

                          <div className={`h-px mb-6 ${isPremium ? 'bg-white/20' : 'bg-slate-200'}`} />

                          <ul className="space-y-3 mb-8">
                            {videoItem && (
                              <li className="flex items-start gap-2.5">
                                <Camera className={`w-5 h-5 shrink-0 mt-0.5 ${isPremium ? 'text-teal-soft' : 'text-teal'}`} />
                                <span className={`text-[15px] font-semibold ${isPremium ? 'text-teal-soft' : 'text-teal-dark'}`}>
                                  {videoItem}
                                </span>
                              </li>
                            )}
                            {otherItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isPremium ? 'text-teal-soft' : 'text-teal'}`} />
                                <span className={`text-[15px] ${isPremium ? 'text-slate-200' : 'text-slate-700'}`}>
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book ${pkg.title} (Rs ${pkg.price}) at Malvan`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-bold text-[15px] transition-all shadow-lg active:scale-[0.98] min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                              isPremium
                                ? 'bg-teal hover:bg-teal-dark text-white shadow-teal/30 focus-visible:ring-teal'
                                : 'bg-teal hover:bg-teal-dark text-white shadow-teal/20 focus-visible:ring-teal'
                            }`}
                          >
                            <WhatsAppIcon size={18} />
                            <span className="relative overflow-hidden">
                              Book on WhatsApp
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                            </span>
                          </a>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'devbag' && (
                <motion.div
                  key="devbag"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-navy mb-2">
                      Boating Packages - Devbag
                    </h2>
                    <p className="text-slate-600 text-[15px]">
                      Family-friendly boating tours near Mahapurush Mandir
                    </p>
                  </div>

                  {/* Devbag Packages Grid */}
                  <div className="flex flex-wrap justify-center gap-6 mb-10">
                    {DEVBAG_PACKAGES.map((pkg, index) => {
                      const isExpanded = expandedPackages.has(pkg.id)
                      const visibleItems = isExpanded ? pkg.items : pkg.items.slice(0, 5)
                      const remainingCount = pkg.items.length - 5
                      const isFullTour = pkg.duration === '2 hr 45 min'
                      
                      return (
                        <motion.div
                          key={pkg.id}
                          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-teal/50 transition-all duration-300 flex flex-col relative overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                          {/* Full Tour accent */}
                          {isFullTour && (
                            <>
                              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-navy via-teal to-navy" />
                              <div className="absolute top-3 right-3">
                                <span className="inline-block px-3 py-1 rounded-full bg-navy text-white text-[11px] font-bold">
                                  Full Tour
                                </span>
                              </div>
                            </>
                          )}

                          <div className="flex items-start justify-between mb-3 mt-1">
                            <span className="inline-block px-3 py-1 rounded-full bg-teal-soft/30 text-teal-dark text-xs font-bold">
                              {pkg.type}
                            </span>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-[13px] font-semibold">
                              <Clock className="w-4 h-4" />
                              <span>{pkg.duration}</span>
                            </div>
                          </div>

                          <h3 className="text-[20px] font-bold text-navy mb-3">{pkg.title}</h3>

                          <div className="mb-5">
                            <div className="text-[40px] font-extrabold text-teal leading-none">
                              <AnimatedPrice price={pkg.price} />
                            </div>
                          </div>

                          <div className="flex-1 mb-5">
                            <div className="flex flex-wrap gap-2">
                              {visibleItems.map((item, idx) => {
                                const isBisleri = item === 'Complimentary Bisleri'
                                return (
                                  <span
                                    key={idx}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium ${
                                      isBisleri
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'bg-teal-soft/20 text-teal-dark border border-teal/20'
                                    }`}
                                  >
                                    {isBisleri ? (
                                      <Droplet className="w-3.5 h-3.5" />
                                    ) : (
                                      <MapPin className="w-3.5 h-3.5" />
                                    )}
                                    <span>{item}</span>
                                  </span>
                                )
                              })}
                              
                              {!isExpanded && remainingCount > 0 && (
                                <button
                                  onClick={() => togglePackage(pkg.id)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold transition-colors min-h-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                                  aria-expanded={isExpanded}
                                >
                                  <span>+{remainingCount} more</span>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                              )}
                              
                              {isExpanded && remainingCount > 0 && (
                                <button
                                  onClick={() => togglePackage(pkg.id)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold transition-colors min-h-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                                  aria-expanded={isExpanded}
                                >
                                  <span>Show less</span>
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book ${pkg.title} (Rs ${pkg.price}) at Devbag`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-teal text-white font-bold text-[15px] hover:bg-teal-dark transition-all shadow-md shadow-teal/20 active:scale-[0.98] min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                          >
                            <WhatsAppIcon size={18} />
                            <span className="relative overflow-hidden">
                              Book on WhatsApp
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                            </span>
                          </a>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Kayaking Package Strip */}
                  <motion.div 
                    className="max-w-full bg-gradient-to-r from-teal via-teal-dark to-navy rounded-3xl p-6 sm:p-8 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                      <div className="shrink-0 hidden lg:block">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                          <Palmtree className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-[26px] font-bold text-white mb-3">{KAYAK_PACKAGE.title}</h3>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white text-[14px] font-semibold backdrop-blur-sm">
                            <Clock className="w-4 h-4" />
                            <span>{KAYAK_PACKAGE.duration}</span>
                          </div>
                          <div className="text-[36px] font-extrabold text-white">
                            ₹{KAYAK_PACKAGE.price.toLocaleString('en-IN')}
                            <span className="text-[15px] font-medium text-white/90 ml-2">{KAYAK_PACKAGE.unit}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                          {KAYAK_PACKAGE.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-[13px] font-medium backdrop-blur-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="shrink-0">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book ${KAYAK_PACKAGE.title} (Rs ${KAYAK_PACKAGE.price} ${KAYAK_PACKAGE.unit}) at Devbag`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-white text-teal font-bold text-[15px] hover:bg-slate-50 transition-all shadow-lg active:scale-[0.98] min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal"
                        >
                          <WhatsAppIcon size={18} />
                          <span className="relative overflow-hidden">
                            Book on WhatsApp
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-teal/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust Line */}
          <motion.div
            className="text-center mt-12 pt-8 border-t border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-[14px] text-slate-600">
              Prices are per person / per boat as listed. <span className="font-semibold text-teal-dark">Confirm availability on WhatsApp.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
