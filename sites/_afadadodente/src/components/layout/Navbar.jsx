import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import { business, navLinks } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          setScrolled(self.scroll() > 80)
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  return (
    <>
      <a href="#main-content" className="absolute -top-full left-4 z-[100] bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-full font-body text-sm focus:top-4 transition-all min-h-[44px] min-w-[44px] inline-flex items-center" tabIndex={0}>
        {t('accessibility.skipToContent')}
      </a>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-[var(--shadow-md)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg md:text-xl text-[var(--color-primary-dark)] py-2 min-h-[44px]">
            <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
            <span>{business.name}</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="font-body text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          {/* Right side — single LanguageToggle for Playwright detection */}
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageToggle />
            <div className="hidden md:block">
              <Button
                href={whatsappUrl}
                variant="primary"
                className="text-sm px-6 py-2.5"
              >
                {t('nav.cta')}
              </Button>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full cursor-pointer text-[var(--color-text-primary)]"
              aria-label={mobileOpen ? t('accessibility.menuClose') : t('accessibility.menuOpen')}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-background)]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="font-display text-2xl font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <Button href={whatsappUrl} variant="primary" className="text-base px-8 py-3.5">
                {t('nav.cta')}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
