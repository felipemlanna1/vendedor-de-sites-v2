import { useEffect } from 'react'
import Lenis from 'lenis'
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Technology from './components/sections/Technology'
import ImpactPhrase from './components/sections/ImpactPhrase'
import Clinic from './components/sections/Clinic'
import Credentials from './components/sections/Credentials'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
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
        <Technology />
        <ImpactPhrase />
        <Clinic />
        <Credentials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
