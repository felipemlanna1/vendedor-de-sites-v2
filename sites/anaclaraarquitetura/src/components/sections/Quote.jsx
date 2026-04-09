import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../ui/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Quote() {
  const { t } = useTranslation()
  const textRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-[var(--color-primary-dark)] grain-overlay overflow-hidden"
    >
      <ScrollReveal>
        <div
          ref={textRef}
          className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16 text-center"
        >
          {/* Opening quote mark */}
          <span className="block font-display text-6xl md:text-8xl text-[var(--color-primary-light)]/20 leading-none mb-4">
            &ldquo;
          </span>

          {/* Quote text */}
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal italic leading-snug text-[var(--color-background)] max-w-4xl mx-auto">
            {t('quote.text')}
          </blockquote>

          {/* Author */}
          <div className="mt-8 md:mt-12">
            <p className="text-sm md:text-base font-medium text-[var(--color-background)]/80">
              {t('quote.author')}
            </p>
            <p className="mt-1 text-sm text-[var(--color-background)]/60">
              {t('quote.context')}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
