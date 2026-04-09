import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LanguageToggle from '../ui/LanguageToggle'
import { siteData } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const navLinks = [
    { key: 'about', href: '#sobre' },
    { key: 'services', href: '#servicos' },
    { key: 'portfolio', href: '#projetos' },
    { key: 'credentials', href: '#credenciais' },
    { key: 'contact', href: '#contato' },
  ]

  const handleNavClick = (href) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-[var(--font-display)] text-lg md:text-xl font-medium text-[var(--color-text-primary)] tracking-tight py-2"
          >
            Elaine Castanheira
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <LanguageToggle />
            <motion.a
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-medium bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              {t('nav.cta')}
            </motion.a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-1.5 p-3 cursor-pointer min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Toggle menu"
            >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-[var(--color-text-primary)]"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-[var(--color-text-primary)]"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-[var(--color-text-primary)]"
            />
          </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--color-background)] flex flex-col items-center justify-center gap-8 lg:hidden pt-16"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="font-[var(--font-display)] text-3xl font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors py-1"
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex flex-col items-center gap-6 mt-4"
            >
              <LanguageToggle />
              <a
                href={siteData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium bg-[var(--color-primary)] text-white px-8 py-3.5 rounded-full"
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
