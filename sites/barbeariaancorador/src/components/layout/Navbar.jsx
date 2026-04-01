import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'

const NAV_SECTIONS = ['captain', 'about', 'services', 'products', 'gallery', 'contact']

export default function Navbar({ content }) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = useCallback((id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const toggleLang = () => {
    const next = i18n.language === 'pt-BR' ? 'en' : 'pt-BR'
    i18n.changeLanguage(next)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg md:text-xl tracking-[0.3em] uppercase cursor-pointer bg-transparent border-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            ANCORADOR
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs uppercase tracking-[0.15em] bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-[var(--color-primary)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
              >
                {t(`nav.${id}`)}
              </button>
            ))}

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="text-sm bg-transparent border border-[var(--color-border)] px-3 py-1.5 cursor-pointer transition-colors duration-300 hover:border-[var(--color-primary)] flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              {i18n.language === 'pt-BR' ? '🇺🇸 English' : '🇧🇷 Português'}
            </button>

            {/* CTA */}
            <a
              href={`https://wa.me/${content.business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.15em] px-6 py-2.5 border border-[var(--color-primary)] transition-colors duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
            >
              {t('nav.book')}
            </a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-[10px] uppercase tracking-wider bg-transparent border border-[var(--color-border)] px-2 py-1 cursor-pointer"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              {i18n.language === 'pt-BR' ? '🇺🇸 English' : '🇧🇷 Português'}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="bg-transparent border-none cursor-pointer p-1"
              aria-label="Menu"
            >
              <Menu size={24} style={{ color: 'var(--color-primary)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: 'rgba(10, 10, 10, 0.98)' }}
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-2"
              aria-label="Close menu"
            >
              <X size={28} style={{ color: 'var(--color-primary)' }} />
            </button>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-8">
              {NAV_SECTIONS.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  onClick={() => scrollTo(id)}
                  className="text-2xl uppercase tracking-[0.25em] bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                >
                  {t(`nav.${id}`)}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4"
              >
                <a
                  href={`https://wa.me/${content.business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base uppercase tracking-[0.2em] px-8 py-3 border-2 border-[var(--color-primary)]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.book')}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
