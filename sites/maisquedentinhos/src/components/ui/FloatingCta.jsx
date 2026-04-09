import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { siteData } from '../../data/content'

export default function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const footer = document.querySelector('footer')
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity
      const windowHeight = window.innerHeight

      // Show after 500px scroll, hide when footer is visible
      setVisible(scrollY > 500 && footerTop > windowHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#128C7E] text-white flex items-center justify-center shadow-xl hover:bg-[#075E54] transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
