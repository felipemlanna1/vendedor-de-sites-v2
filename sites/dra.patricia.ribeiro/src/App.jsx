import { useEffect } from 'react'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Specialty from './components/sections/Specialty'
import Treatments from './components/sections/Treatments'
import Numbers from './components/sections/Numbers'
import Faq from './components/sections/Faq'
import Contact from './components/sections/Contact'

// SEO
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'

// UI
import FloatingCta from './components/ui/FloatingCta'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <HelmetProvider>
      <JsonLd />
      <FaqSchema />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Specialty />
        <Treatments />
        <Numbers />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </HelmetProvider>
  )
}
