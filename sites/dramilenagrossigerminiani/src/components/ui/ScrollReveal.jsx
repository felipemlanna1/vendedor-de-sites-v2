import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'

const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
}

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) {
  const offset = offsets[direction] || offsets.up
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)

    // Fallback: reveal after 2s regardless (handles SSR, fullpage captures, etc.)
    const timer = setTimeout(() => {
      setInView(true)
      obs.disconnect()
    }, 2000)

    return () => {
      clearTimeout(timer)
      obs.disconnect()
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ ...offset, opacity: 0 }}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : { ...offset, opacity: 0 }}
      transition={{
        duration,
        delay: inView ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
