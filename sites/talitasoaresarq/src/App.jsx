import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingCTA from './components/layout/FloatingCTA'
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'
import SocialProof from './components/sections/SocialProof'
import Contact from './components/sections/Contact'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.3,
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
        <About />
        <Services />
        <Portfolio />
        <Process />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
