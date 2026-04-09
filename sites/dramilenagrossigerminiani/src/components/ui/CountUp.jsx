import { useRef, useEffect, useState } from 'react'

export default function CountUp({ end, duration = 2, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animate = () => {
      if (started.current) return
      started.current = true

      const startTime = performance.now()
      const durationMs = duration * 1000

      const step = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        // ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress)
        setValue(Math.round(eased * end))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)

    // Fallback: start counting after 2s regardless
    const timer = setTimeout(() => {
      animate()
      obs.disconnect()
    }, 2000)

    return () => {
      clearTimeout(timer)
      obs.disconnect()
    }
  }, [end, duration])

  return <span ref={ref} className={className}>{prefix}{value.toLocaleString('pt-BR')}{suffix}</span>
}
