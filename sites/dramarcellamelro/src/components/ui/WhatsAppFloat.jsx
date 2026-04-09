import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat({ phone = '5547999999999', message = '' }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('hero')?.offsetHeight || 600
      const footerEl = document.getElementById('contact')
      const scrollY = window.scrollY

      // Aparece apos sair do hero
      const pastHero = scrollY > heroHeight * 0.8

      // Some quando footer esta visivel
      let footerVisible = false
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect()
        footerVisible = rect.top < window.innerHeight * 0.8
      }

      setVisible(pastHero && !footerVisible)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappUrl = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
