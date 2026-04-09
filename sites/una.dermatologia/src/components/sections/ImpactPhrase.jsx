import { useTranslation } from 'react-i18next'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ImpactPhrase() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="py-16 md:py-24 lg:py-32 bg-[var(--color-primary)]">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 text-center">
        <p
          ref={ref}
          className="font-display text-2xl md:text-3xl lg:text-4xl font-light italic text-white/90 tracking-wide"
        >
          {t('impact.phrase')}
        </p>
        <div
          ref={lineRef}
          className="mx-auto mt-8 h-px w-24 bg-[var(--color-secondary)] origin-center"
        />
      </div>
    </div>
  )
}
