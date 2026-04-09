import { useEffect } from 'react'
import Lenis from 'lenis'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Quote from './components/sections/Quote'
import Portfolio from './components/sections/Portfolio'
import Differentials from './components/sections/Differentials'
import Credentials from './components/sections/Credentials'
import Contact from './components/sections/Contact'

// UI
import FloatingCta from './components/ui/FloatingCta'

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
      <JsonLd />
      <FaqSchema />
      <a
        href="#sobre"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--color-accent)] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o conteudo
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Quote />
        <Portfolio />
        <Differentials />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  )
}
