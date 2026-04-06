import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import { deliveryLinks } from '../../data/content'

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/cardapio', label: t('nav.menu') },
    { to: '/nossa-historia', label: t('nav.history') },
    { to: '/unidades', label: t('nav.locations') },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-secondary)] backdrop-blur-md shadow-lg py-3'
            : 'bg-[var(--color-secondary)] py-5'
        }`}
      >
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 flex items-center justify-between" style={{ backgroundColor: '#1A1A1A' }}>
          <Link to="/" className="flex items-center gap-3 min-h-[44px] py-1" style={{ color: '#FAFAF5' }}>
            <img
              src="/images/logo-usina-ifood.png"
              alt="Usina do Hamburguer"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-[var(--font-display)] font-bold text-lg tracking-tight hidden sm:block" style={{ color: '#FAFAF5' }}>
              Usina do Hamburguer
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ color: location.pathname === link.to ? '#D4A017' : '#FAFAF5', backgroundColor: '#1A1A1A' }}
                className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageToggle className="text-white/80" />
            <Button href={deliveryLinks.ifood} variant="primary" className="text-sm px-6 py-2.5">
              {t('nav.cta')}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-[var(--color-secondary)] flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-[var(--font-display)] font-bold text-white hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <Button href={deliveryLinks.ifood} variant="primary" className="text-lg px-10 py-4">
                {t('nav.cta')}
              </Button>
              <LanguageToggle className="text-white/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
