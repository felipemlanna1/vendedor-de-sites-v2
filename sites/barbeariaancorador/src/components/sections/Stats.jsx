import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 534, suffix: '+', label: 'Seguidores' },
  { value: 2024, suffix: '', label: 'Ano de fundação' },
  { value: 5, suffix: '', label: 'Serviços premium' },
  { value: 100, suffix: '%', label: 'Dedicação à tradição' },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const numberRefs = useRef([])
  const hasAnimated = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true

          STATS.forEach((stat, i) => {
            const el = numberRefs.current[i]
            if (!el) return

            if (prefersReduced) {
              el.textContent = `${stat.value}${stat.suffix}`
              return
            }

            const obj = { val: 0 }
            gsap.to(obj, {
              val: stat.value,
              duration: stat.value > 100 ? 2 : 1.2,
              delay: i * 0.15,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${Math.round(obj.val)}${stat.suffix}`
              },
            })
          })

          if (!prefersReduced) {
            gsap.fromTo('.stat-item',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            )
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-20"
      style={{
        background: 'linear-gradient(180deg, #1a1508 0%, #141414 50%, #1a1508 100%)',
      }}
    >
      {/* Top and bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-primary)] opacity-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-primary)] opacity-10" />

      <div className="max-w-5xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center opacity-0"
            >
              <span
                ref={(el) => (numberRefs.current[i] = el)}
                className="block text-4xl md:text-5xl lg:text-5xl mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
              >
                0
              </span>
              <span
                className="block text-xs md:text-sm uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
