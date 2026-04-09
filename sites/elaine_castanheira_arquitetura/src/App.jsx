import { useEffect } from 'react'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Statement from './components/sections/Statement'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Numbers from './components/sections/Numbers'
import Credentials from './components/sections/Credentials'
import CtaSection from './components/sections/CtaSection'
import Contact from './components/sections/Contact'
import FloatingCta from './components/ui/FloatingCta'
import { faqs } from './data/content'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <HelmetProvider>
      <JsonLd />
      <FaqSchema faqs={faqs} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Statement />
        <Services />
        <Portfolio />
        <Numbers />
        <Credentials />
        <CtaSection />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </HelmetProvider>
  )
}
