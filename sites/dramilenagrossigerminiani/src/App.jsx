import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Lenis from 'lenis'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import TreatmentsHof from './components/sections/TreatmentsHof'
import Transition from './components/sections/Transition'
import TreatmentsOdonto from './components/sections/TreatmentsOdonto'
import Kids from './components/sections/Kids'
import Differentials from './components/sections/Differentials'
import Location from './components/sections/Location'
import Contact from './components/sections/Contact'

// UI
import WhatsAppFloat from './components/ui/WhatsAppFloat'

// SEO
import JsonLd from './components/seo/JsonLd'
import FaqSchema from './components/seo/FaqSchema'

export default function App() {
  // Smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
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
      <Helmet>
        <html lang="pt-BR" />
        <title>Dra. Milena Grossi Germiniani | Harmonizacao Orofacial e Ortodontia em Ouro Fino, MG</title>
        <meta
          name="description"
          content="Especialista em Harmonizacao Orofacial, Ortodontia e Invisalign em Ouro Fino, MG. Toxina botulinica, preenchimento, bioestimuladores, ortodontia invisivel. Agende sua avaliacao."
        />
        <meta name="theme-color" content="#B8876B" />
        <link rel="canonical" href="https://dramilenagrossigerminiani.pages.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dra. Milena Grossi Germiniani — A arte da naturalidade" />
        <meta property="og:description" content="Harmonizacao Orofacial, Ortodontia e Invisalign em Ouro Fino, MG. CRO MG 26.171." />
        <meta property="og:image" content="https://dramilenagrossigerminiani.pages.dev/images/campanha-selfcare-rosto.jpg" />
        <meta property="og:url" content="https://dramilenagrossigerminiani.pages.dev" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <JsonLd />
      <FaqSchema />

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <TreatmentsHof />
        <Transition />
        <TreatmentsOdonto />
        <Kids />
        <Differentials />
        <Location />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
