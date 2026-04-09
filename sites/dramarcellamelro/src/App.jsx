import { useEffect } from 'react'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'
import WhatsAppFloat from './components/ui/WhatsAppFloat'

import Hero from './components/sections/Hero'
import Manifesto from './components/sections/Manifesto'
import About from './components/sections/About'
import Services from './components/sections/Services'
import ImpactPhrase from './components/sections/ImpactPhrase'
import Differentials from './components/sections/Differentials'
import InstagramFeed from './components/sections/InstagramFeed'
import Contact from './components/sections/Contact'

import { siteData } from './data/content'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true })
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
        <Manifesto />
        <About />
        <Services />
        <ImpactPhrase />
        <Differentials />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat
        phone={siteData.whatsappNumber}
        message={siteData.whatsappMessage}
      />
    </HelmetProvider>
  )
}
