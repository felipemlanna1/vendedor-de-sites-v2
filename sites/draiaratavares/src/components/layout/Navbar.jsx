import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['about', 'services', 'results', 'contact']

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => setScrolled(self.progress > 0),
      })
    })
    return () => ctx.revert()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-surface)]/95 backdrop-blur-md shadow-[var(--shadow-sm)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] py-2 inline-flex items-center min-h-[44px]"
          >
            Dra. Iara Tavares
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-8">
            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="font-body text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300"
                >
                  {t(`nav.${link}`)}
                </a>
              ))}
            </div>

            {/* Language toggle — always visible, single instance */}
            <LanguageToggle />

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="text-sm px-6 py-3"
              >
                {t('nav.cta')}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('accessibility.close_menu') : t('accessibility.open_menu')}
              className="md:hidden w-11 h-11 flex items-center justify-center text-[var(--color-text-primary)]"
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
            className="fixed inset-0 z-40 bg-[var(--color-surface)] flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link}`}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="font-heading text-3xl font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {t(`nav.${link}`)}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.cta')}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* LanguageToggle is in the main navbar — no duplicate needed */}
              <span className="font-body text-sm text-[var(--color-text-muted)]">{t('footer.social')}: {siteData.instagramHandle}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
