import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const { direction = 'up', delay = 0, duration = 1, distance = 60 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const dirs = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 }
    }
    const from = dirs[direction] || dirs.up

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, ...from },
        {
          opacity: 1, x: 0, y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      )
    })

    return () => ctx.revert()
  }, [direction, delay, duration, distance])

  return ref
}
