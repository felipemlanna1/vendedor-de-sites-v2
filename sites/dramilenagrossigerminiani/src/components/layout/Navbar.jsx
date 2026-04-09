import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Monogram from '../ui/Monogram'

const NAV_LINKS = [
  { key: 'about', href: '#sobre' },
  { key: 'treatments', href: '#tratamentos-hof' },
  { key: 'results', href: '#resultados' },
  { key: 'kids', href: '#infantil' },
  { key: 'location', href: '#localizacao' },
  { key: 'contact', href: '#contato' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleLang = () => {
    const next = i18n.language === 'pt-BR' ? 'en' : 'pt-BR'
    i18n.changeLanguage(next)
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--color-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
      >
        {t('accessibility.skipToContent')}
      </a>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-[var(--max-width-wide)] flex items-center justify-between px-5 py-4 md:px-8 lg:px-12">
          {/* Logo / Monogram */}
          <a href="#" className="flex items-center gap-3 group min-h-[44px] min-w-[44px]" aria-label="Dra. Milena Grossi Germiniani">
            <Monogram size={40} animate={false} />
            <span className="hidden sm:block font-[var(--font-display)] text-lg tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              Dra. Milena
            </span>
          </a>

          {/* Right side controls */}
          <div className="flex items-center gap-2 lg:gap-8">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[var(--color-primary)] after:transition-all hover:after:w-full"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
            </div>

            {/* Language toggle — single button, always visible */}
            <button
              onClick={toggleLang}
              className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-wider cursor-pointer px-3.5 py-2.5 rounded-md border border-[var(--color-primary-light)]/40 hover:border-[var(--color-primary)] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Trocar idioma"
            >
              {i18n.language === 'pt-BR' ? 'EN' : 'PT'}
            </button>

            {/* Desktop CTA */}
            <a
              href="https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Milena."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex text-sm font-medium bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              {t('nav.cta')}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-[var(--color-text-primary)] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-background)] flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="text-2xl font-[var(--font-display)] text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 mt-4"
            >
              <button
                onClick={() => { toggleLang(); setMobileOpen(false) }}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-wider cursor-pointer px-4 py-2 rounded-md border border-[var(--color-primary-light)]/40 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Trocar idioma"
              >
                {i18n.language === 'pt-BR' ? 'EN' : 'PT'}
              </button>
              <a
                href="https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Milena."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium bg-[var(--color-primary)] text-white px-8 py-3 rounded-full"
              >
                {t('nav.cta')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
