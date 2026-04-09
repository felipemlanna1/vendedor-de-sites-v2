import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const from = {
      up: { y: 40 },
      down: { y: -40 },
      left: { x: -40 },
      right: { x: 40 },
    }
    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...from[direction],
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [direction, delay, duration])
  return <div ref={ref} className={className}>{children}</div>
}
