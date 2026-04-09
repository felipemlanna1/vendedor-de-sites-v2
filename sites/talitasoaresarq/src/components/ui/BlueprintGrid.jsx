import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Signature Element: Blueprint Grid
 * SVG pattern of thin orthogonal lines (like a simplified floor plan)
 * that draws itself when the section enters the viewport.
 */
export default function BlueprintGrid({ className = '', opacity = 0.15 }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.grid-line')
    if (!paths?.length) return

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal lines */}
      <line className="grid-line" x1="0" y1="180" x2="1440" y2="180" stroke="var(--pergaminho)" strokeWidth="0.5" />
      <line className="grid-line" x1="0" y1="360" x2="1440" y2="360" stroke="var(--pergaminho)" strokeWidth="0.5" />
      <line className="grid-line" x1="0" y1="540" x2="1440" y2="540" stroke="var(--pergaminho)" strokeWidth="0.5" />
      <line className="grid-line" x1="0" y1="720" x2="1440" y2="720" stroke="var(--pergaminho)" strokeWidth="0.5" />

      {/* Vertical lines */}
      <line className="grid-line" x1="288" y1="0" x2="288" y2="900" stroke="var(--pergaminho)" strokeWidth="0.5" />
      <line className="grid-line" x1="576" y1="0" x2="576" y2="900" stroke="var(--pergaminho)" strokeWidth="0.5" />
      <line className="grid-line" x1="864" y1="0" x2="864" y2="900" stroke="var(--pergaminho)" strokeWidth="0.5" />
      <line className="grid-line" x1="1152" y1="0" x2="1152" y2="900" stroke="var(--pergaminho)" strokeWidth="0.5" />

      {/* Architectural detail lines */}
      <rect className="grid-line" x="320" y="200" width="200" height="140" stroke="var(--pergaminho)" strokeWidth="0.3" rx="2" />
      <rect className="grid-line" x="920" y="400" width="160" height="100" stroke="var(--pergaminho)" strokeWidth="0.3" rx="2" />
      <line className="grid-line" x1="320" y1="270" x2="520" y2="270" stroke="var(--pergaminho)" strokeWidth="0.3" />
      <line className="grid-line" x1="400" y1="200" x2="400" y2="340" stroke="var(--pergaminho)" strokeWidth="0.3" />
    </svg>
  )
}
