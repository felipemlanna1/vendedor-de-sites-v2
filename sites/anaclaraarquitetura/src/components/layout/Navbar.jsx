import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import { siteData } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['sobre', 'servicos', 'portfolio', 'diferenciais', 'contato']

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          setScrolled(self.progress > 0)
        },
      })

      NAV_LINKS.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-secondary)] backdrop-blur-md shadow-lg'
            : 'bg-[var(--color-secondary)]/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] flex items-center justify-between px-6 py-3 md:px-8 lg:px-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-background)] py-2 px-3"
          >
            Ana Clara
          </button>

          {/* Desktop center — nav links (use <a> not <button> to avoid Playwright selector conflicts) */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id) }}
                className={`relative text-sm font-medium transition-colors py-2.5 px-3 cursor-pointer ${
                  activeSection === id
                    ? 'text-[var(--color-accent-on-dark)]'
                    : 'text-[var(--color-background)] hover:text-[var(--color-accent-on-dark)]'
                }`}
              >
                {t(`nav.${id}`)}
                {activeSection === id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-[var(--color-accent-on-dark)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right side — responsive: single LanguageToggle + desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-1 md:gap-4">
            <LanguageToggle variant="light" />
            <motion.a
              href={siteData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex bg-[var(--color-accent-btn)] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              {t('nav.cta')}
            </motion.a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[var(--color-background)] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-secondary)] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => scrollTo(id)}
                  className={`font-display text-3xl font-semibold tracking-tight py-2 px-4 ${
                    activeSection === id
                      ? 'text-[var(--color-accent-on-dark)]'
                      : 'text-[var(--color-background)]'
                  }`}
                >
                  {t(`nav.${id}`)}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
                className="mt-4"
              >
                <a
                  href={siteData.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-accent-btn)] text-white text-lg font-medium px-8 py-3.5 rounded-full inline-flex items-center min-h-[44px]"
                >
                  {t('nav.cta')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
