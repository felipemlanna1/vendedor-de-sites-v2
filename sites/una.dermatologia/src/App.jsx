import { useEffect } from 'react'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import JsonLd from './components/seo/JsonLd'
import Hero from './components/sections/Hero'
import ImpactPhrase from './components/sections/ImpactPhrase'
import About from './components/sections/About'
import Team from './components/sections/Team'
import Services from './components/sections/Services'
import Technology from './components/sections/Technology'
import Space from './components/sections/Space'
import Location from './components/sections/Location'
import CtaFinal from './components/sections/CtaFinal'

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
      <Navbar />
      <main>
        <Hero />
        <ImpactPhrase />
        <About />
        <Team />
        <Services />
        <Technology />
        <Space />
        <Location />
        <CtaFinal />
      </main>
      <Footer />
    </HelmetProvider>
  )
}
