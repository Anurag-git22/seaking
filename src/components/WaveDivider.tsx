import { motion } from 'framer-motion'

export const WaveDivider = () => {
  return (
    <div className="relative w-full overflow-hidden -mt-1">
      <motion.svg
        className="w-full h-12 sm:h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="M0,60 C300,90 900,30 1200,60 L1200,0 L0,0 Z"
          fill="currentColor"
          className="text-slate-50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  )
}
