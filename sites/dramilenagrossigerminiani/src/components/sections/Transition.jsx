import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import CountUp from '../ui/CountUp'
import { siteData } from '../../data/content'

export default function Transition() {
  const { t } = useTranslation()

  return (
    <section className="relative py-24 md:py-32 bg-[var(--color-background)] overflow-hidden px-5">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[var(--color-primary)]/30" />

      <div className="mx-auto max-w-[var(--max-width-narrow)] px-5 text-center">
        <ScrollReveal>
          <p className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-medium text-[var(--color-text-primary)] leading-tight italic tracking-tight">
            "{t('transition.phrase')}"
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex justify-center gap-12 md:gap-20">
            <div className="text-center">
              <CountUp
                end={siteData.stats.procedures}
                suffix="+"
                className="font-[var(--font-display)] text-5xl md:text-6xl font-semibold text-[var(--color-primary)] block"
              />
              <p className="text-sm text-[var(--color-text-muted)] mt-2 uppercase tracking-wider">
                {t('transition.counter')}
              </p>
            </div>
            <div className="text-center">
              <CountUp
                end={siteData.stats.yearsFamily}
                suffix="+"
                className="font-[var(--font-display)] text-5xl md:text-6xl font-semibold text-[var(--color-primary)] block"
              />
              <p className="text-sm text-[var(--color-text-muted)] mt-2 uppercase tracking-wider">
                anos de legado
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-[var(--color-primary)]/30" />
    </section>
  )
}
