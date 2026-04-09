import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import { navLinks } from '../../data/content'

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
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-[var(--font-display)] font-semibold text-lg tracking-tight text-[var(--color-text-primary)] py-2 min-h-[44px] flex items-center">
            Dra. Ariel C&#243;rdova
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
            <LanguageToggle />
            <Button
              href={`https://wa.me/5548991232270?text=${encodeURIComponent('Ol\u00e1, gostaria de agendar uma consulta.')}`}
              variant="primary"
              className="text-sm"
            >
              {t('nav.cta')}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-3 text-[var(--color-text-primary)] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[var(--color-surface)] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16">
              <span className="font-[var(--font-display)] font-semibold text-lg tracking-tight">
                Dra. Ariel C&#243;rdova
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map(({ key, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl font-[var(--font-display)] font-medium text-[var(--color-text-primary)]"
                >
                  {t(`nav.${key}`)}
                </motion.a>
              ))}
              <LanguageToggle className="mt-2" />
              <Button
                href={`https://wa.me/5548991232270?text=${encodeURIComponent('Ol\u00e1, gostaria de agendar uma consulta.')}`}
                variant="primary"
                className="mt-4"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.cta')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
