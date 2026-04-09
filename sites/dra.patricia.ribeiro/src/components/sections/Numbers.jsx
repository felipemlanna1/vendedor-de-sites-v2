import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import CountUp from '../ui/CountUp'

const stats = [
  { key: 'patients', end: 1000, prefix: '+', suffix: '' },
  { key: 'experience', end: 10, prefix: '+', suffix: '' },
  { key: 'cro', end: 56979, prefix: '', suffix: '' },
  { key: 'city', end: 1, prefix: '', suffix: '' },
]

export default function Numbers() {
  const { t } = useTranslation()

  return (
    <section id="numbers" className="relative py-20 md:py-28 lg:py-36 bg-[var(--color-accent)]/20 overflow-hidden">
      {/* Subtle grain texture via CSS */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        <ScrollReveal>
          <span className="text-sm font-medium text-[var(--color-secondary)] tracking-wide uppercase block mb-4 text-center">
            {t('numbers.label')}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-[var(--color-primary-dark)] mb-16 md:mb-20 leading-tight text-center max-w-2xl mx-auto">
            {t('numbers.title')}
          </h2>
        </ScrollReveal>

        {/* Contadores em grid centralizado */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={0.2 + i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-display)] font-bold text-[var(--color-primary)]">
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="mt-3 text-sm md:text-base text-[var(--color-text-secondary)] leading-snug">
                  {t(`numbers.${stat.key}.label`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Frase de impacto */}
        <ScrollReveal delay={0.6}>
          <p className="mt-16 md:mt-20 text-center text-lg md:text-xl text-[var(--color-text-secondary)] italic max-w-xl mx-auto">
            {t('numbers.impact_phrase')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
