import { useEffect } from 'react'
import Lenis from 'lenis'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections (ordered by scroll position)
import Hero from './components/sections/Hero'
import Impact from './components/sections/Impact'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Counters from './components/sections/Counters'
import Differentials from './components/sections/Differentials'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'

// UI
import FloatingCta from './components/ui/FloatingCta'
import FairyDustDivider from './components/ui/FairyDustDivider'
import FloatingFairyElements from './components/ui/FloatingFairyElements'

// SEO
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'

export default function App() {
  // Lenis smooth scroll
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
    <>
      <FloatingFairyElements />
      <JsonLd />
      <FaqSchema />
      <Navbar />
      <main id="main-content">
        <Hero />
        <FairyDustDivider />
        <Impact />
        <FairyDustDivider />
        <About />
        <FairyDustDivider />
        <Services />
        <Counters />
        <FairyDustDivider />
        <Differentials />
        <FairyDustDivider />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  )
}
