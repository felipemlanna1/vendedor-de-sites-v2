import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['about', 'team', 'services', 'technology', 'location']

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => setScrolled(self.scroll() > 80),
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] flex items-center justify-between px-5 py-3 md:px-8 lg:px-16">
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer px-3 py-3"
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-[var(--color-primary)]">
              UNA
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-secondary)] hidden sm:inline">
              Dermatologia
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.04]"
              >
                {t(`nav.${link}`)}
              </button>
            ))}
            <LanguageToggle />
            <Button
              href={siteData.whatsappLink}
              variant="primary"
              className="text-sm px-6 py-2.5"
            >
              {t('nav.cta')}
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-0">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-3 cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X size={24} className="text-[var(--color-text-primary)]" />
              ) : (
                <Menu size={24} className="text-[var(--color-text-primary)]" />
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
            className="fixed inset-0 z-40 bg-[var(--color-surface)] flex flex-col items-center justify-center gap-6"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNavClick(link)}
                className="font-display text-3xl font-medium text-[var(--color-primary)] cursor-pointer px-6 py-3"
              >
                {t(`nav.${link}`)}
              </motion.button>
            ))}
            <LanguageToggle className="mt-2" />
            <Button
              href={siteData.whatsappLink}
              variant="primary"
              className="mt-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.cta')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
