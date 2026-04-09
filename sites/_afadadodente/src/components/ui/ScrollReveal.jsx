import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  const offsets = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: -30 },
    right: { x: 30 },
  }

  const initial = { ...offsets[direction], opacity: 0.35 }
  const animate = inView ? { x: 0, y: 0, opacity: 1 } : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
