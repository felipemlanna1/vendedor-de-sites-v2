import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/message/JRYVYA4DDXJPF1'

export default function WhatsAppCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const footer = document.getElementById('contato')
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity

      setVisible(scrollY > 300 && footerTop > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#0D6B5E] text-white shadow-lg hover:shadow-xl hover:bg-[#075E54] transition-shadow cursor-pointer"
      aria-label="Agendar consulta pelo WhatsApp"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  )
}
