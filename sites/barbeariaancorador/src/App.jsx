import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'
import { useContent } from './data/content'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
// Stats removed per user request
import Captain from './components/sections/Captain'
import Lifestyle from './components/sections/Lifestyle'
import Services from './components/sections/Services'
import CtaBanner from './components/sections/CtaBanner'
import Products from './components/sections/Products'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'
import JsonLd from './components/seo/JsonLd'
import AdminPanel from './components/sections/AdminPanel'
import FloatingCta from './components/ui/FloatingCta'

const ADMIN_HASH = 'ancorador-admin-7f3k9x'

export default function App() {
  const { content, loading } = useContent()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '')
    if (path === ADMIN_HASH) {
      setIsAdmin(true)
    }
  }, [])

  useEffect(() => {
    if (isAdmin) return
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [isAdmin])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isAdmin) {
    return <AdminPanel content={content} />
  }

  return (
    <HelmetProvider>
      <JsonLd content={content} />
      <Navbar content={content} />
      <main>
        <Hero content={content} />
        <Captain content={content} />
        <About content={content} />
        <Lifestyle />
        <Services content={content} />
        <CtaBanner content={content} />
        <Products content={content} />
        <Gallery content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      <FloatingCta whatsapp={content.business?.whatsapp} />
    </HelmetProvider>
  )
}
