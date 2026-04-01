import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarCheck } from 'lucide-react'

export default function FloatingCta({ whatsapp }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${whatsapp || '5548988397456'}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-full uppercase tracking-[0.1em] text-[11px] font-semibold"
          style={{
            position: 'fixed',
            bottom: '3rem',
            right: '1.25rem',
            zIndex: 999,
            padding: '0.75rem 1.25rem',
            fontFamily: 'var(--font-display)',
            background: 'var(--color-primary)',
            color: 'var(--color-background)',
            boxShadow: '0 4px 24px rgba(200,164,92,0.35)',
          }}
          aria-label="Agendar"
        >
          <CalendarCheck size={16} strokeWidth={2.5} />
          AGENDAR
        </motion.a>
      )}
    </AnimatePresence>
  )
}
