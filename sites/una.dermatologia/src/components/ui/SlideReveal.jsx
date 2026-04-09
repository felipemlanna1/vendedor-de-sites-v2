import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Like ScrollReveal but without opacity change (for WCAG contrast compliance) */
export default function SlideReveal({ children, delay = 0, duration = 0.8, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 30,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [delay, duration])

  return <div ref={ref} className={className}>{children}</div>
}
