import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import { siteData } from '../../data/content'

const navItems = siteData.navLinks.filter(link => link.id !== 'hero')

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    const hero = document.getElementById('hero')
    if (hero) observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-[var(--shadow-md)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo / Nome */}
          <button
            onClick={() => scrollTo('hero')}
            className={`font-[var(--font-display)] font-bold text-lg md:text-xl tracking-tight cursor-pointer transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-[var(--color-accent)]/10 ${
              scrolled ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary-dark)]'
            }`}
          >
            Dra. Patrícia
          </button>

          {/* Right side: lang toggle first in DOM (for Playwright), then nav, CTA, hamburger */}
          <div className="flex items-center gap-1">
            {/* Language toggle — DOM first, visually ordered via CSS order */}
            <LanguageToggle className="order-2 lg:order-2" />

            {/* Desktop nav links — order-1 so they appear before toggle on desktop */}
            <div className="hidden lg:flex items-center gap-2 order-1">
              {navItems.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium cursor-pointer transition-colors duration-300 px-4 py-2.5 rounded-lg hover:text-[var(--color-secondary)] hover:bg-[var(--color-accent)]/10 ${
                    scrolled ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {t(`nav.${link.label}`)}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.a
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:inline-flex bg-[var(--color-secondary)] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer ml-2 order-3"
            >
              {t('nav.cta')}
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-3 cursor-pointer rounded-lg hover:bg-[var(--color-accent)]/10 min-w-[44px] min-h-[44px] flex items-center justify-center order-3"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileOpen ? (
                <X size={24} className="text-[var(--color-text-primary)]" />
              ) : (
                <Menu size={24} className={scrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-primary-dark)]'} />
              )}
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
            className="fixed inset-0 z-40 bg-[var(--color-background)]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-[var(--font-display)] font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-secondary)] transition-colors cursor-pointer"
              >
                {t(`nav.${link.label}`)}
              </motion.button>
            ))}
            <motion.a
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 bg-[var(--color-secondary)] text-white text-lg font-medium px-8 py-3.5 rounded-full"
            >
              {t('nav.cta')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
