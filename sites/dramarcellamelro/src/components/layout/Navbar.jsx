import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { siteData } from '../../data/content'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(siteData.whatsappMessage)}`

  const handleNavClick = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-sm'
            : 'bg-[var(--color-primary-dark)]/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-[var(--max-width)] items-center justify-between px-5 py-4 md:px-8 lg:px-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 px-3 py-2"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-[var(--font-display)] text-base font-semibold transition-colors duration-300 ${
                scrolled
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-[var(--color-background)]/50 text-[var(--color-background)]'
              }`}
            >
              MM
            </span>
            <span
              className={`font-[var(--font-display)] text-lg font-medium transition-colors duration-300 ${
                scrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-background)]'
              }`}
            >
              {siteData.name}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            <LanguageToggle />
            {siteData.navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 font-[var(--font-body)] text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[var(--color-primary)] ${
                  scrolled ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-background)]/80'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
            <Button href={whatsappUrl} variant="primary" className="text-xs">
              {t('nav.cta')}
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-background)]'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-background)]'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-background)]"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-[var(--font-display)] text-lg font-medium text-[var(--color-text-primary)]">
                {siteData.name}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6 text-[var(--color-text-primary)]" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {siteData.navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => handleNavClick(item.id)}
                  className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)]"
                >
                  {t(item.labelKey)}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button href={whatsappUrl} variant="primary">
                  {t('nav.cta')}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <LanguageToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
