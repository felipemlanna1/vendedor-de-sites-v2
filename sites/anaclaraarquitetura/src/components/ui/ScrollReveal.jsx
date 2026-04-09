import { useRef, useEffect, useState } from 'react'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  distance = 30,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)

    // Fallback: show after 1.5s regardless (for testing tools that don't scroll)
    const timer = setTimeout(() => setVisible(true), 1500)

    return () => {
      obs.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const dirMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    fade: 'none',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : dirMap[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay * 1000}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  )
}
