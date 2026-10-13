import { useState, useRef } from 'react'
import { Compass, X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO } from '../components/SEO'
import { GALLERY_ITEMS, VIDEOS } from '../data/constants'

export default function Gallery() {
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'photos' | 'videos'>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null)

  const totalItems = GALLERY_ITEMS.length + VIDEOS.length

  const handleKeyDown = (e: KeyboardEvent) => {
    if (lightboxIndex === null) return
    if (e.key === 'Escape') {
      setLightboxIndex(null)
      if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
    }
    if (e.key === 'ArrowRight') {
      if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalItems : null))
    }
    if (e.key === 'ArrowLeft') {
      if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalItems) % totalItems : null))
    }
  }

  return (
    <>
      <SEO 
        title="Gallery" 
        description="View photos and videos of Sea King Boating Safari tours in Malvan. Explore our collection of backwater cruises, dolphin safaris, and island adventures."
      />

      <div className="pt-24 pb-16 sm:pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-light text-sand-warm text-xs font-bold tracking-wide uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              Media Collection
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Gallery
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Moments on the calm Malvan backwaters & sapphire sea
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {(['all', 'photos', 'videos'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-4 py-2 min-h-[40px] rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal ${
                  galleryFilter === filter
                    ? 'bg-teal text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {/* Photos */}
            {(galleryFilter === 'all' || galleryFilter === 'photos') && GALLERY_ITEMS.map((item, index) => (
              <motion.button
                key={`photo-${index}`}
                onClick={() => setLightboxIndex(index)}
                className="w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
                aria-label={`View photo: ${item.title}`}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1 }
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.button>
            ))}

            {/* Videos */}
            {(galleryFilter === 'all' || galleryFilter === 'videos') && VIDEOS.map((videoSrc, index) => {
              const videoIndex = GALLERY_ITEMS.length + index
              return (
                <motion.div
                  key={`video-${index}`}
                  className="w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
                  onClick={() => setLightboxIndex(videoIndex)}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1 }
                  }}
                >
                  <video
                    ref={(el) => { videoRefs.current[videoIndex] = el }}
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    loop
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-navy/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-md z-10">
                    Video
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-teal fill-teal ml-0.5 sm:ml-1" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const isVideo = lightboxIndex >= GALLERY_ITEMS.length
          const currentItem = isVideo 
            ? { src: VIDEOS[lightboxIndex - GALLERY_ITEMS.length], title: `Safari Video ${lightboxIndex - GALLERY_ITEMS.length + 1}`, category: 'Video' }
            : GALLERY_ITEMS[lightboxIndex]

          return (
            <motion.div 
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => {
                setLightboxIndex(null)
                if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => {
                  setLightboxIndex(null)
                  if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
                }}
                className="absolute top-4 right-4 z-50 p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close viewer"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
                  setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalItems) % totalItems : null))
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (lightboxVideoRef.current) lightboxVideoRef.current.pause()
                  setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalItems : null))
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div 
                className="relative max-w-5xl w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isVideo ? (
                  <video
                    ref={lightboxVideoRef}
                    src={currentItem.src}
                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  />
                )}
                <div className="mt-4 text-center text-white px-4">
                  <p className="font-semibold text-base sm:text-lg">{currentItem.title}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {lightboxIndex + 1} of {totalItems} • {currentItem.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
