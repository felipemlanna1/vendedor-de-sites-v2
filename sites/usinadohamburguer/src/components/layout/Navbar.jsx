import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { images } from '../../data/content'

function LangButton() {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'
  const toggle = () => i18n.changeLanguage(isEN ? 'pt-BR' : 'en')
  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center rounded-lg text-sm font-bold min-h-[48px]"
      style={{ color: '#FAFAF5', backgroundColor: '#333333', padding: '12px 16px' }}
      aria-label={isEN ? 'Mudar para Portugues' : 'Switch to English'}
    >
      {isEN ? 'PT' : 'EN'}
    </button>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

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
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="mx-auto max-w-[var(--max-width)] flex items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={images.logo}
            alt="Usina do Hamburguer"
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover"
          />
          <span
            className="text-lg font-bold tracking-tight hidden sm:inline"
            style={{ color: '#D4A017', backgroundColor: '#1A1A1A', fontFamily: 'var(--font-display)' }}
          >
            Usina do Hamburguer
          </span>
        </Link>

        {/* Right side controls - single LangButton visible on all sizes */}
        <div className="flex items-center gap-1 md:gap-6">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors min-h-[48px] flex items-center"
                style={{
                  color: location.pathname === link.to ? '#D4A017' : '#FAFAF5',
                  backgroundColor: '#1A1A1A',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Single LangButton - always visible */}
          <LangButton />

          {/* Desktop order CTA */}
          <a
            href="https://www.ifood.com.br/delivery/florianopolis-sc/usina-do-hamburguer---trindade-trindade/c32722d8-6ab1-4400-85af-31e5edeb4c9b"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold min-h-[48px] transition-transform hover:scale-105"
            style={{ backgroundColor: '#D4A017', color: '#1A1A1A' }}
          >
            {t('nav.order')}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-12 h-12"
            aria-label="Menu"
            style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay - always rendered, hidden via CSS to avoid contrast race condition */}
      <div
        className="md:hidden absolute top-full left-0 right-0 border-t border-[#333]"
        style={{
          backgroundColor: '#1A1A1A',
          display: menuOpen ? 'block' : 'none',
        }}
      >
          <div className="flex flex-col px-5 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-base font-medium py-3 min-h-[48px] flex items-center"
                style={{
                  color: location.pathname === link.to ? '#D4A017' : '#FAFAF5',
                  backgroundColor: '#1A1A1A',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.ifood.com.br/delivery/florianopolis-sc/usina-do-hamburguer---trindade-trindade/c32722d8-6ab1-4400-85af-31e5edeb4c9b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-bold min-h-[48px] mt-2"
              style={{ backgroundColor: '#D4A017', color: '#1A1A1A' }}
            >
              {t('nav.order')}
            </a>
          </div>
        </div>
    </nav>
  )
}
