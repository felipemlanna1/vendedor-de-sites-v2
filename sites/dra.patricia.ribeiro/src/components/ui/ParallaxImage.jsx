import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({ src, alt, speed = 0.2, className = '', objectPosition = 'center' }) {
  const containerRef = useRef(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el.querySelector('img'), {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [speed])
  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" style={{ objectPosition }} loading="lazy" />
    </div>
  )
}
