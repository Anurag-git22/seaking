import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Locations = lazy(() => import('./pages/Locations'))
const Contact = lazy(() => import('./pages/Contact'))
const Packages = lazy(() => import('./pages/Packages'))
const MalvanPackages = lazy(() => import('./pages/MalvanPackages'))
const DevbagPackages = lazy(() => import('./pages/DevbagPackages'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="packages" element={<Packages />} />
          <Route path="malvan-packages" element={<MalvanPackages />} />
          <Route path="devbag-packages" element={<DevbagPackages />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="locations" element={<Locations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
