import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({ src, alt, speed = 0.2, className = '' }) {
  const containerRef = useRef(null)
  const imgRef = useRef(null)

  useGSAP(() => {
    gsap.to(imgRef.current, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: containerRef, dependencies: [speed] })

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover"
        decoding="async"
      />
    </div>
  )
}
