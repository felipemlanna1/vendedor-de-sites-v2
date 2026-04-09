import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { siteData } from '../../data/content'

export default function FloatingCta() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const footer = document.querySelector('footer')
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity

      // Show after 300px, hide near footer
      setVisible(scrollY > 300 && footerTop > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsapp_float.aria')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-[var(--shadow-lg)] cursor-pointer hover:bg-[var(--color-primary-dark)] transition-colors duration-300"
        >
          <MessageCircle size={24} />
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[var(--color-primary-light)]/30 animate-ping" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
