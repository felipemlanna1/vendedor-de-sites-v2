// ============================================================
// ⚠️  REFERENCIA DE PATTERNS DE CLEANUP — NAO COPIE
// ============================================================
// Estes templates existem APENAS como referencia de:
// - API patterns (ctx.revert, viewport: once, etc)
// - Cleanup patterns (useEffect return, ScrollTrigger kill, etc)
// - Accessibility patterns (aria-labels, reduced-motion, etc)
//
// Cada site DEVE criar seus PROPRIOS componentes baseados no
// blueprint tecnico do mapa-encantamento.md (Phase 3).
//
// Se voce esta copiando este arquivo inteiro, voce esta ERRADO.
// Consulte os MCPs (magic-ui, aceternity-ui, gsap) primeiro.
// ============================================================

// === src/components/ui/ScrollReveal.jsx ===
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const from = {
      up: { y: 60, opacity: 0 },
      down: { y: -60, opacity: 0 },
      left: { x: -60, opacity: 0 },
      right: { x: 60, opacity: 0 },
    }
    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...from[direction],
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [direction, delay, duration])
  return <div ref={ref} className={className}>{children}</div>
}

// === src/components/ui/AnimatedText.jsx ===
import { motion } from 'motion/react'

export default function AnimatedText({ text, tag: Tag = 'h2', className = '', delay = 0 }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

// === src/components/ui/ParallaxImage.jsx ===
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({ src, alt, speed = 0.2, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [speed])
  return (
    <div className={`overflow-hidden ${className}`}>
      <img ref={ref} src={src} alt={alt} className="w-full h-[120%] object-cover" loading="lazy" />
    </div>
  )
}

// === src/components/ui/CountUp.jsx ===
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function CountUp({ end, duration = 2, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        onUpdate: () => setValue(Math.round(obj.val)),
      })
    })
    return () => ctx.revert()
  }, [end, duration])
  return <span ref={ref} className={className}>{prefix}{value.toLocaleString('pt-BR')}{suffix}</span>
}

// === src/components/ui/Button.jsx ===
import { motion } from 'motion/react'

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors'
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white px-8 py-3.5 hover:bg-[var(--color-primary-dark)]',
    secondary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3.5 hover:bg-[var(--color-primary)] hover:text-white',
    ghost: 'text-[var(--color-text-secondary)] px-6 py-3 hover:text-[var(--color-primary)]',
  }
  const Component = href ? motion.a : motion.button
  return (
    <Component
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

// === src/components/ui/LanguageToggle.jsx ===
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button onClick={toggle} className={`relative flex items-center gap-1 text-sm font-medium ${className}`}>
      <span className={isEN ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}>PT</span>
      <div className="w-10 h-5 bg-[var(--color-surface)] rounded-full relative mx-1">
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-primary)] absolute top-0.5"
          animate={{ left: isEN ? '22px' : '2px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={isEN ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>EN</span>
    </button>
  )
}

// === src/components/layout/Section.jsx ===
export default function Section({ id, children, className = '', background = '' }) {
  return (
    <section
      id={id}
      className={`px-5 py-20 md:px-8 md:py-24 lg:px-16 lg:py-32 ${background} ${className}`}
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        {children}
      </div>
    </section>
  )
}

// === src/App.jsx — SPA (pagina unica com secoes) ===
import { useEffect } from 'react'
import Lenis from 'lenis'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import JsonLd from './components/seo/JsonLd'
// import each section component here

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <HelmetProvider>
      <JsonLd />
      <Navbar />
      <main>
        {/* Render section components in order here */}
      </main>
      <Footer />
    </HelmetProvider>
  )
}

// === src/App.jsx — MULTI-PAGINA (React Router) ===
// Usar este modelo se o site tem paginas dedicadas (decidido na Fase 2.6)
//
// import { useEffect } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Lenis from 'lenis'
// import { HelmetProvider } from 'react-helmet-async'
// import Navbar from './components/layout/Navbar'
// import Footer from './components/layout/Footer'
// import JsonLd from './components/seo/JsonLd'
// import Home from './pages/Home'        // pagina principal com secoes
// import ServicePage from './pages/ServicePage'  // pagina individual de servico
// import MenuPage from './pages/MenuPage'        // cardapio completo
// import ContactPage from './pages/ContactPage'  // contato dedicado
//
// export default function App() {
//   useEffect(() => {
//     const lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true })
//     function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
//     requestAnimationFrame(raf)
//     return () => lenis.destroy()
//   }, [])
//
//   return (
//     <HelmetProvider>
//       <BrowserRouter>
//         <JsonLd />
//         <Navbar />
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/servicos/:slug" element={<ServicePage />} />
//             <Route path="/cardapio" element={<MenuPage />} />
//             <Route path="/contato" element={<ContactPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </BrowserRouter>
//     </HelmetProvider>
//   )
// }

// === src/index.css ===
// ATENCAO: Tailwind v4 ja inclui Preflight (reset). NAO adicione * { margin: 0; padding: 0; }
// Isso DESTROI todos os paddings do Tailwind. O unico reset aceito e box-sizing:
//
// @import "tailwindcss";
// @import "./design-system/tokens.css";
// *, *::before, *::after { box-sizing: border-box; }
// html { scroll-behavior: auto; }
// body { font-family: var(--font-body); color: var(--color-text-primary); background: var(--color-background); -webkit-font-smoothing: antialiased; }
// @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }

// === src/main.jsx ===
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'    // MUST import i18n config BEFORE App
import './index.css'
// import '@fontsource/inter/400.css'   // add chosen fonts
// import '@fontsource/inter/600.css'
// import '@fontsource/inter/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
