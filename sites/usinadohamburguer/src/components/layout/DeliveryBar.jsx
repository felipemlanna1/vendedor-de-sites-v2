import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { deliveryLinks } from '../../data/content'

const channels = [
  { key: 'ifood', url: deliveryLinks.ifood, color: '#EA1D2C', icon: 'iF' },
  { key: 'rappi', url: deliveryLinks.rappi, color: '#C4341A', icon: 'R' },
  { key: 'anotaai', url: deliveryLinks.anotaai, color: '#007A2E', icon: 'A' },
  { key: 'whatsapp', url: deliveryLinks.whatsapp, color: '#128C4E', icon: 'W' },
]

export default function DeliveryBar() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-[var(--color-secondary)]/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
            <div className="flex items-center justify-around gap-2 max-w-md mx-auto">
              {channels.map((ch) => (
                <a
                  key={ch.key}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 min-w-[60px] group"
                  style={{ color: '#FFFFFF', backgroundColor: '#1A1A1A' }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm transition-transform group-active:scale-90"
                    style={{ backgroundColor: ch.color }}
                  >
                    {ch.icon}
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.7)', backgroundColor: '#1A1A1A' }}>
                    {t(`delivery.${ch.key}`)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
