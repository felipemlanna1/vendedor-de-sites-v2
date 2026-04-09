import { useEffect } from 'react'
import Lenis from 'lenis'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import Hero from './components/sections/Hero'
import Sobre from './components/sections/Sobre'
import Contadores from './components/sections/Contadores'
import Servicos from './components/sections/Servicos'
import Tecnologia from './components/sections/Tecnologia'
import FraseImpacto from './components/sections/FraseImpacto'
import Locais from './components/sections/Locais'
import Contato from './components/sections/Contato'

// UI
import EcgLine from './components/ui/EcgLine'
import WhatsAppCTA from './components/ui/WhatsAppCTA'

// SEO
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // Add lenis class to html for smooth scroll detection
    document.documentElement.classList.add('lenis')

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      document.documentElement.classList.remove('lenis')
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <JsonLd />
      <FaqSchema />
      <Navbar />

      <main>
        <Hero />
        <EcgLine className="my-0" />
        <Sobre />
        <Contadores />
        <Servicos />
        <Tecnologia />
        <FraseImpacto />
        <Locais />
        <Contato />
      </main>

      <Footer />
      <WhatsAppCTA />
    </div>
  )
}
