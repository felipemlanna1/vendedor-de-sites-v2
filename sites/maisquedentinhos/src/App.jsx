import { useEffect } from 'react'
import Lenis from 'lenis'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections (emotional journey order)
import Hero from './components/sections/Hero'
import Counters from './components/sections/Counters'
import About from './components/sections/About'
import Services from './components/sections/Services'
import ImpactPhrase from './components/sections/ImpactPhrase'
import Timeline from './components/sections/Timeline'
import Credentials from './components/sections/Credentials'
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
    <>
      <JsonLd />
      <FaqSchema />
      <Navbar />
      <main>
        <Hero />
        <Counters />
        <About />
        <Services />
        <ImpactPhrase />
        <Timeline />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  )
}
