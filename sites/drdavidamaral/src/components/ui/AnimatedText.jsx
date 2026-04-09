import { useRef, useEffect, useState } from 'react'

export default function AnimatedText({ text, tag: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block mr-[0.25em] transition-all duration-600 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}
          style={
            inView
              ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: `all 0.5s ease-out ${delay + i * 0.08}s`,
                }
              : undefined
          }
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
