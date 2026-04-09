import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import CountUp from '../ui/CountUp'
import Section from '../layout/Section'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE_KEYS = ['2015', '2019', '2020', '2024', 'atual']

function TimelineItem({ year, index }) {
  const { t } = useTranslation()

  return (
    <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.06}>
      <div
        className={`relative flex items-start gap-4 md:gap-8 ${
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
      {/* Year marker */}
      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-primary-light)] ml-1 md:ml-0">
        <span className="font-display text-base md:text-lg font-bold text-[var(--color-primary-dark)]">
          {year === 'atual' ? t('about.timeline.atual.institution') : year}
        </span>
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 pb-10 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
        <h4 className="font-display text-lg md:text-xl font-semibold text-[var(--color-text-primary)]">
          {t(`about.timeline.${year}.title`)}
        </h4>
        <p className="mt-1 text-sm font-medium text-[var(--color-accent-text)]">
          {t(`about.timeline.${year}.institution`)}
        </p>
        <p className="mt-2 text-[var(--color-text-secondary)] text-sm leading-relaxed">
          {t(`about.timeline.${year}.description`)}
        </p>
      </div>
      </div>
    </ScrollReveal>
  )
}

function TimelineLine() {
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={lineRef}
      className="absolute left-[32px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-primary-light)]/30 -translate-x-1/2"
    />
  )
}

export default function About() {
  const { t } = useTranslation()

  return (
    <>
      <Section id="sobre" background="bg-[var(--color-background)]">
        {/* Label */}
        <ScrollReveal>
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-text)] mb-4">
            {t('about.label')}
          </span>
        </ScrollReveal>

        {/* Title */}
        <AnimatedText
          text={t('about.title')}
          tag="h2"
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight"
        />

        {/* Bio text */}
        <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-6 md:gap-12">
          <ScrollReveal delay={0.1}>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-base md:text-lg">
              {t('about.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] leading-relaxed text-base md:text-lg">
              {t('about.description2')}
            </p>
          </ScrollReveal>
        </div>

        {/* Ana Clara portrait + workspace */}
        <ScrollReveal delay={0.3} className="mt-12 md:mt-16">
          <div className="grid md:grid-cols-5 gap-4 md:gap-6">
            {/* Portrait — takes 2 cols */}
            <div className="md:col-span-2 relative overflow-hidden rounded-xl" style={{ aspectRatio: '1/1' }}>
              <img
                src="/images/ana-clara-retrato.png"
                alt={t('about.imageAlt')}
                className="w-full h-full object-cover"
                loading="lazy"
                width={460}
                height={460}
              />
            </div>
            {/* Workspace — takes 3 cols */}
            <div className="md:col-span-3 relative overflow-hidden rounded-xl" style={{ aspectRatio: '3/2' }}>
              <img
                src="/images/mesa-trabalho-arquiteta.jpg"
                alt="Escritório de arquitetura com projetos e maquetes"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1200}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/20 to-transparent" />
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="mt-16 md:mt-24">
          <ScrollReveal>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] text-center mb-12">
              {t('about.label')}
            </h3>
          </ScrollReveal>

          <div className="relative max-w-2xl mx-auto">
            <TimelineLine />
            <div className="relative flex flex-col">
              {TIMELINE_KEYS.map((year, i) => (
                <TimelineItem key={year} year={year} index={i} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Counter micro-section */}
      <section className="relative py-16 md:py-24 bg-[var(--color-surface)] overflow-hidden">
        <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16 text-center">
          <ScrollReveal>
            <div className="max-w-[520px] mx-auto">
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg mb-2">
                {t('about.counter.prefix')}
              </p>
              <div className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-primary)]">
                <CountUp end={48} duration={2.5} />
              </div>
              <p className="mt-2 text-[var(--color-text-secondary)] text-base md:text-lg">
                {t('about.counter.suffix')}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {t('about.counter.period')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
