import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { siteData } from '../../data/content'

export default function FloatingCta() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportH = window.innerHeight

      // Show after 30vh
      const showAfter = viewportH * 0.3

      // Hide near contact section
      const contactEl = document.getElementById('contato')
      let hideNearContact = false
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        hideNearContact = rect.top < viewportH && rect.bottom > 0
      }

      setVisible(scrollY > showAfter && !hideNearContact)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={siteData.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('whatsappFloat.ariaLabel')}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[var(--color-accent-btn)] text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle size={24} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
