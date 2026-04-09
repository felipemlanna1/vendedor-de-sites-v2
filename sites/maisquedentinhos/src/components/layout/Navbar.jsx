import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = siteData.navSections

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-surface)] shadow-md'
            : 'bg-[var(--color-surface)]/90 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo - text based */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex flex-col leading-tight">
            <span className="text-base md:text-lg font-bold text-[var(--color-primary-dark)]" style={{ fontFamily: 'var(--font-display)' }}>
              Dra. Marcia Oliveira
            </span>
            <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)]">
              Odontopediatria
            </span>
          </a>

          {/* Right side - all items */}
          <div className="flex items-center gap-4">
            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors cursor-pointer"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </div>

            {/* Language toggle - ALWAYS visible */}
            <LanguageToggle />

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                href={siteData.whatsappLink}
                variant="primary"
                className="text-sm px-6 py-2.5"
              >
                {t('nav.cta')}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-3 -mr-2 text-[var(--color-text-primary)] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={menuOpen ? t('accessibility.close_menu') : t('accessibility.open_menu')}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--color-surface)] flex flex-col items-center justify-center gap-8 md:hidden pt-16"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-semibold text-[var(--color-text-primary)] cursor-pointer px-6 py-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(link.labelKey)}
              </motion.button>
            ))}
            <Button href={siteData.whatsappLink} variant="primary" className="mt-4">
              {t('nav.cta')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
