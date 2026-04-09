import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({ src, alt, speed = 0.2, className = '', loading = 'lazy' }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [speed])
  return (
    <div className={`overflow-hidden ${className}`}>
      <img ref={ref} src={src} alt={alt} className="w-full h-[120%] object-cover" loading={loading} />
    </div>
  )
}
