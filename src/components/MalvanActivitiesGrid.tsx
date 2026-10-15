import { useState } from 'react'
import { Camera, Wind, Waves } from 'lucide-react'
import { motion } from 'framer-motion'
import { MALVAN_ACTIVITIES } from '../data/packages'
import { useReducedMotion } from '../hooks/useReducedMotion'

const fallbackIcon = (name: string) =>
  name.toLowerCase().includes('scuba') || name.toLowerCase().includes('diving') ? (
    <Waves className="w-10 h-10 text-white/90" />
  ) : (
    <Wind className="w-10 h-10 text-white/90" />
  )

const ActivityTile = ({
  activity,
  index,
  reduced,
}: {
  activity: (typeof MALVAN_ACTIVITIES)[number]
  index: number
  reduced: boolean
}) => {
  const [broken, setBroken] = useState(false)
  const isWater = activity.group === 'water'
  const showImage = Boolean(activity.img) && !broken

  return (
    <motion.button
      type="button"
      aria-label={activity.name}
      className="group relative aspect-square rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-teal to-navy transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.07 }}
      whileTap={{ scale: reduced ? 1 : 0.97 }}
    >
      {activity.img && (
        <img
          src={activity.img}
          alt={activity.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
          onError={() => setBroken(true)}
        />
      )}

      {!showImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal to-navy">
          {fallbackIcon(activity.name)}
        </div>
      )}

      <div className="absolute top-1/2 inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-navy/80" />

      {activity.note && (
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal text-white text-[10px] font-semibold shadow-sm">
          <Camera className="w-3 h-3" />
          <span>{activity.note}</span>
        </span>
      )}

      {isWater && (
        <span
          className={`absolute top-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-navy/80 text-white text-[9px] md:text-[10px] font-semibold shadow-sm ${
            activity.note ? 'right-2' : 'left-2'
          }`}
        >
          <Wind className="w-2.5 h-2.5" />
          <span>Water Sports</span>
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <p className="font-semibold text-[15px] md:text-[17px] leading-snug break-words">
          {activity.name}
        </p>
      </div>
    </motion.button>
  )
}

export const MalvanActivitiesGrid = () => {
  const reduced = useReducedMotion()

  return (
    <div>
      <p className="text-center text-sm font-semibold text-teal mb-3">
        Includes Water Sports (+4 rides)
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-[760px] mx-auto">
        {MALVAN_ACTIVITIES.map((activity, index) => (
          <ActivityTile key={activity.id} activity={activity} index={index} reduced={reduced} />
        ))}
      </div>
    </div>
  )
}