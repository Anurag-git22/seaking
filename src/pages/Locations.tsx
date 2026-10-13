import { MapPin, Clock, Navigation, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { LOCATIONS } from '../data/constants'

export default function Locations() {
  return (
    <>
      <SEO 
        title="Locations" 
        description="Sea King operates in 2 locations in Malvan - Devbag and Tarkarli Jetty. Find directions, timings, and contact information."
      />

      <div className="pt-24 pb-16 sm:pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              Boarding Points
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              We Operate in 2 Locations
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Board our boats conveniently from Malvan's scenic coastal harbors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {LOCATIONS.map((location, index) => (
              <motion.div
                key={location.id}
                className="group rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={location.image}
                    alt={`${location.name} Boarding Jetty`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-navy/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-teal-light animate-ping" />
                    <span>{location.name.split(',')[0]}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-sand text-navy text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Loc 0{index + 1}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-navy mb-2 leading-tight">
                      {location.name}
                    </h2>
                    
                    <div className="space-y-3 text-sm text-slate-600 mt-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                        <span>{location.address}, {location.state}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-teal shrink-0" />
                        <span className="font-medium text-slate-800">Open daily, {location.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-navy text-white text-sm font-bold hover:bg-navy-light transition-colors shadow-sm group-hover:bg-teal group-hover:text-white focus:outline-none focus:ring-2 focus:ring-teal"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
