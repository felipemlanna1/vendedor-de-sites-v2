import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'

const navLinks = ['about', 'services', 'portfolio', 'process', 'contact']

export default function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--linho)]/95 backdrop-blur-md shadow-sm'
            : 'bg-[var(--linho)]/80 backdrop-blur-sm'
        }`}
        style={{ padding: isScrolled ? '12px 0' : '20px 0' }}
      >
        <div className="mx-auto max-w-[var(--max-width-full)] flex items-center justify-between" style={{ padding: '0 32px' }}>
          {/* Logo / Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xl md:text-2xl text-[var(--carvao)] tracking-tight"
            style={{ padding: '8px 14px' }}
          >
            Talita<span className="text-[var(--terracota)]">.</span>Soares
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm font-medium text-[var(--grafite)] hover:text-[var(--terracota)] transition-colors duration-300 tracking-wide"
                style={{ padding: '8px 14px' }}
              >
                {t(`nav.${link}`)}
              </button>
            ))}
            <LanguageToggle />
            <button
              onClick={() => scrollTo('contact')}
              className="bg-[var(--terracota)] text-white text-sm font-medium rounded-sm hover:bg-[var(--terracota-hover)] transition-colors duration-300"
              style={{ padding: '10px 24px' }}
            >
              {t('nav.cta')}
            </button>
          </div>

          {/* Mobile: Language Toggle + Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center text-[var(--carvao)]"
              style={{ padding: '12px', minWidth: '44px', minHeight: '44px' }}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--linho)] lg:hidden"
            style={{ paddingTop: '96px', paddingLeft: '32px', paddingRight: '32px' }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link)}
                  className="text-left font-display text-3xl text-[var(--carvao)] hover:text-[var(--terracota)] transition-colors"
                  style={{ padding: '8px 0' }}
                >
                  {t(`nav.${link}`)}
                </motion.button>
              ))}
              <div className="border-t border-[var(--pergaminho)]" style={{ paddingTop: '16px' }}>
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full bg-[var(--terracota)] text-white font-medium rounded-sm text-lg"
                  style={{ padding: '16px' }}
                >
                  {t('nav.cta')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
