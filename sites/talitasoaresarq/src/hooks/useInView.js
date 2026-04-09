import { useRef, useState, useEffect } from 'react'

/**
 * Custom hook for IntersectionObserver.
 * Returns [ref, isInView] — isInView becomes true when element enters viewport.
 */
export default function useInView({ threshold = 0.1, rootMargin = '-50px', once = true } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isInView]
}
