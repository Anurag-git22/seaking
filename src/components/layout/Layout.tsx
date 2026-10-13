import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileStickyBar } from './MobileStickyBar'
import { useScrollToTop } from '../../hooks/useScrollToTop'

export const Layout = () => {
  useScrollToTop()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-teal selection:text-white font-sans antialiased">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  )
}
