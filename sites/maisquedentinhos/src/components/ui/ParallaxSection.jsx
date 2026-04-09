import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxSection({ children, speed = 0.3, className = '' }) {
  const ref = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}
