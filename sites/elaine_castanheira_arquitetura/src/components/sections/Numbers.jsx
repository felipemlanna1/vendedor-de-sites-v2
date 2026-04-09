import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import CountUp from '../ui/CountUp'

const stats = [
  { end: 20, suffix: '+', key: 'years' },
  { end: 150, suffix: '+', key: 'projects' },
  { end: 12, suffix: 'K', key: 'followers' },
  { end: 1999, prefix: '', suffix: '', key: 'ufsc' },
]

export default function Numbers() {
  const { t } = useTranslation()

  return (
    <section className="px-6 py-16 md:py-20 bg-[var(--color-text-primary)] overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.1} className="text-center">
              <div className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-2">
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <p className="text-sm md:text-base text-white/60 font-light">
                {t(`numbers.${stat.key}`)}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
