import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) {
  const ref = useRef(null)

  useGSAP(() => {
    const el = ref.current
    const offsets = {
      up: { y: 30 },
      down: { y: -30 },
      left: { x: -20 },
      right: { x: 20 },
    }
    gsap.from(el, {
      ...offsets[direction],
      opacity: 0.35,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    })
  }, { scope: ref, dependencies: [direction, delay, duration] })

  return <div ref={ref} className={className}>{children}</div>
}
