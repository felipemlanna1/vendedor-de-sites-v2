import { useRef, useEffect, useState } from 'react'

export default function AnimatedText({ text, tag: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const words = text.split(' ')

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
      { threshold: 0.1, rootMargin: '-30px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] transition-transform duration-500 ease-out"
          style={{
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: `${(delay + i * 0.08) * 1000}ms`,
            clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
            transition: `transform 500ms ease-out ${(delay + i * 0.08) * 1000}ms, clip-path 500ms ease-out ${(delay + i * 0.08) * 1000}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
