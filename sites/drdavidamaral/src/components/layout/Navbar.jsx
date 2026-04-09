import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import LanguageToggle from '../ui/LanguageToggle'
import Button from '../ui/Button'
import Logo from '../ui/Logo'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = ['sobre', 'servicos', 'tecnologia', 'locais', 'contato']

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

  const handleNavClick = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center cursor-pointer py-2 min-h-[44px]"
            >
              <Logo size="md" variant="full" />
            </a>

            {/* Right side — adapts between mobile and desktop */}
            <div className="flex items-center gap-2 md:gap-6">
              {/* Desktop nav links — hidden on mobile */}
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`hidden md:inline-flex text-sm font-medium transition-colors duration-200 cursor-pointer px-4 py-2.5 rounded-lg ${
                    scrolled
                      ? 'text-text-secondary hover:text-primary hover:bg-primary/5'
                      : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {t(`nav.${link}`)}
                </button>
              ))}

              {/* Language toggle — SINGLE instance, always visible */}
              <LanguageToggle />

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Button
                  href="https://wa.me/message/JRYVYA4DDXJPF1"
                  variant="primary"
                  className="text-sm whitespace-nowrap"
                >
                  {t('nav.cta')}
                </Button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-3 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6 text-text-primary" />
                ) : (
                  <Menu className={`w-6 h-6 transition-colors ${scrolled ? 'text-text-primary' : 'text-text-primary'}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-5 h-16">
                <Logo size="sm" variant="full" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => handleNavClick(link)}
                    className="text-2xl font-[family-name:var(--font-display)] font-semibold text-text-primary hover:text-primary transition-colors cursor-pointer px-8 py-3 min-h-[44px] flex items-center justify-center"
                  >
                    {t(`nav.${link}`)}
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.08, duration: 0.4 }}
                >
                  <Button
                    href="https://wa.me/message/JRYVYA4DDXJPF1"
                    variant="whatsapp"
                    className="text-lg px-10 py-4"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('nav.cta')}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
