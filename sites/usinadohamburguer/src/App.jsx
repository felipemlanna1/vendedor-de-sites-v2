import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import DeliveryBar from './components/layout/DeliveryBar'
import Footer from './components/layout/Footer'
import JsonLd from './components/seo/JsonLd'
import Home from './pages/Home'
import Cardapio from './pages/Cardapio'
import NossaHistoria from './pages/NossaHistoria'
import Unidades from './pages/Unidades'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
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
    <>
      <ScrollToTop />
      <JsonLd />
      <DeliveryBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/nossa-historia" element={<NossaHistoria />} />
          <Route path="/unidades" element={<Unidades />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  )
}
