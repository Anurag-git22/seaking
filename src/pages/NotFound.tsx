import { Link } from 'react-router-dom'
import { Home, Anchor } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found" 
        description="The page you're looking for doesn't exist. Return to Sea King Boating Safari homepage."
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 pt-20">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-teal/20 to-navy/20 flex items-center justify-center">
            <Anchor className="w-16 h-16 text-teal" />
          </div>
          
          <h1 className="text-6xl font-extrabold text-navy mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
          <p className="text-slate-600 mb-8">
            The page you're looking for seems to have drifted away on the tide.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal text-white font-bold hover:bg-teal-dark transition-colors shadow-md"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </>
  )
}
