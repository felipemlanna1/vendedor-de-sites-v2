import { useRef, useEffect, useState } from 'react'

export default function AnimatedText({
  text,
  tag: Tag = 'h2',
  className = '',
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
      { threshold: 0.1 }
    )
    obs.observe(el)

    // Fallback: show after 1s regardless (for testing tools)
    const timer = setTimeout(() => setVisible(true), 1000)

    return () => {
      obs.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] transition-all duration-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: `${i * 60}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
