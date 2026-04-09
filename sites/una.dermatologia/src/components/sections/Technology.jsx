import { useTranslation } from 'react-i18next'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '../layout/Section'
import SlideReveal from '../ui/SlideReveal'
import CountUp from '../ui/CountUp'

gsap.registerPlugin(ScrollTrigger)

export default function Technology() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax-like gradient shift on the overlay
      gsap.to(overlayRef.current, {
        backgroundPosition: '50% 30%',
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
      id="technology"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Background with gradient layers */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-dark)]"
        style={{ backgroundSize: '200% 200%', backgroundPosition: '50% 50%' }}
      />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative px-5 py-20 md:px-8 md:py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[var(--max-width)]">
          <SlideReveal>
            <p className="text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4">
              {t('technology.label')}
            </p>
          </SlideReveal>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-white">
            {t('technology.title')}
          </h2>

          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-[60ch]">
            {t('technology.subtitle')}
          </p>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Content */}
            <div className="space-y-6">
              <SlideReveal delay={0.1}>
                <p className="text-lg leading-relaxed text-white/80">
                  {t('technology.paragraph_1')}
                </p>
              </SlideReveal>
              <SlideReveal delay={0.2}>
                <p className="text-lg leading-relaxed text-white/80">
                  {t('technology.paragraph_2')}
                </p>
              </SlideReveal>
              <SlideReveal delay={0.3}>
                <p className="text-lg leading-relaxed text-white/80 italic">
                  {t('technology.paragraph_3')}
                </p>
              </SlideReveal>
            </div>

            {/* Right - Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              <SlideReveal delay={0.1}>
                <div className="text-center p-6 rounded-2xl bg-white/[0.06] border border-white/10">
                  <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-secondary)]">
                    <CountUp end={5.0} decimals={1} duration={2} />
                  </div>
                  <p className="mt-2 text-sm text-white/60 font-medium">{t('technology.stat_1_label')}</p>
                </div>
              </SlideReveal>

              <SlideReveal delay={0.2}>
                <div className="text-center p-6 rounded-2xl bg-white/[0.06] border border-white/10">
                  <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-secondary)]">
                    <CountUp end={5.0} decimals={1} duration={2} />
                  </div>
                  <p className="mt-2 text-sm text-white/60 font-medium">{t('technology.stat_2_label')}</p>
                </div>
              </SlideReveal>

              <SlideReveal delay={0.3}>
                <div className="text-center p-6 rounded-2xl bg-white/[0.06] border border-white/10">
                  <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-secondary)]">
                    <CountUp end={27} duration={2} suffix="+" />
                  </div>
                  <p className="mt-2 text-sm text-white/60 font-medium">{t('technology.stat_3_label')}</p>
                </div>
              </SlideReveal>

              <SlideReveal delay={0.4}>
                <div className="text-center p-6 rounded-2xl bg-white/[0.06] border border-white/10">
                  <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-secondary)]">
                    <CountUp end={0} duration={1} />
                  </div>
                  <p className="mt-2 text-sm text-white/60 font-medium">{t('technology.stat_4_label')}</p>
                </div>
              </SlideReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
