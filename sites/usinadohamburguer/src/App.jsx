import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import DeliveryBar from './components/layout/DeliveryBar'
import JsonLd from './components/seo/JsonLd'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import HistoryPage from './pages/HistoryPage'
import LocationsPage from './pages/LocationsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppShell() {
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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<MenuPage />} />
          <Route path="/nossa-historia" element={<HistoryPage />} />
          <Route path="/unidades" element={<LocationsPage />} />
        </Routes>
      </main>
      <Footer />
      <DeliveryBar />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HelmetProvider>
  )
}
