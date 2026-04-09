import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ImpactPhrase() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { scale: 0.92 },
        {
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
      }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/crianca-dentista-feliz.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
          opacity: 0.85,
        }}
      />

      <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16 text-center">
        <p
          ref={textRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('impact.phrase')}
        </p>
      </div>
    </section>
  )
}
