import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { siteData } from '../../data/content'
import { MessageCircle } from 'lucide-react'

export default function FloatingCta() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      const footerEl = document.querySelector('footer')
      const footerTop = footerEl ? footerEl.getBoundingClientRect().top : Infinity

      setVisible(scrollY > heroHeight * 0.8 && footerTop > window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          href={siteData.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--color-primary-dark)] transition-colors group"
          aria-label={t('whatsapp.tooltip')}
          title={t('whatsapp.tooltip')}
        >
          <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
          <span className="absolute right-full mr-3 bg-[var(--color-text-primary)] text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
            {t('whatsapp.tooltip')}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
