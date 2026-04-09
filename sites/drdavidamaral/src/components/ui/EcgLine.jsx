import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EcgLine({ className = '' }) {
  const pathRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={`w-full overflow-hidden pointer-events-none ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 1200 120"
        fill="none"
        className="w-full h-20 md:h-28"
        preserveAspectRatio="none"
      >
        {/* ECG/Pulse line pattern */}
        <path
          ref={pathRef}
          d="M0,60 L200,60 L240,60 L260,20 L280,100 L300,30 L320,80 L340,60 L380,60 L600,60 L640,60 L660,15 L680,105 L700,25 L720,85 L740,60 L780,60 L1000,60 L1040,60 L1060,20 L1080,100 L1100,30 L1120,80 L1140,60 L1200,60"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    </div>
  )
}
