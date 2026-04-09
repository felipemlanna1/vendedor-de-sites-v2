import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// SEO
import JsonLd from './components/seo/JsonLd'

// Sections (in order)
import Hero from './components/sections/Hero'
import Quote from './components/sections/Quote'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Results from './components/sections/Results'
import Stats from './components/sections/Stats'
import Faq from './components/sections/Faq'
import Contact from './components/sections/Contact'

// UI
import FloatingCta from './components/ui/FloatingCta'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <HelmetProvider>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <Quote i18nKey="quote1" />
        <About />
        <Services />
        <Results />
        <Stats />
        <Quote i18nKey="quote2" />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </HelmetProvider>
  )
}
