import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const transforms = {
      up: { y: 40 },
      down: { y: -40 },
      left: { x: -40 },
      right: { x: 40 },
    }

    let animated = false

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          if (animated) return
          animated = true
          gsap.fromTo(
            el,
            { ...transforms[direction], opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration,
              delay,
              ease: 'power3.out',
            }
          )
        },
      })
    })

    return () => ctx.revert()
  }, [direction, delay, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
