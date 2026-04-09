import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { business } from '../../data/content'

export default function FloatingCta() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY
      const viewH = window.innerHeight

      // Show after 30vh scroll
      const showThreshold = viewH * 0.3

      // Hide near contact section
      const contactEl = document.getElementById('contato')
      let nearContact = false
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        nearContact = rect.top < viewH && rect.bottom > 0
      }

      setVisible(scrollY > showThreshold && !nearContact)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 right-6 z-40"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--color-surface)] shadow-[var(--shadow-md)] px-4 py-2 rounded-full"
              >
                <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">
                  {t('floatingCta.tooltip')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('floatingCta.ariaLabel')}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <MessageCircle className="w-6 h-6" />
          </a>

          {/* Sparkle ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)]/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
