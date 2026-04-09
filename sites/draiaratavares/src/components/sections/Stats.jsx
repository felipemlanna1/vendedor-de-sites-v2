import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import CountUp from '../ui/CountUp'
import { siteData } from '../../data/content'

const STATS_CONFIG = [
  { key: 'followers', end: siteData.stats.followers, suffix: '+' },
  { key: 'procedures', end: siteData.stats.procedures, suffix: '+' },
  { key: 'experience', end: siteData.stats.experience, suffix: '' },
  { key: 'satisfaction', end: siteData.stats.satisfaction, suffix: '%' },
]

export default function Stats() {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-16 md:py-20 md:px-8 lg:px-16 bg-[var(--color-dark-surface)]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS_CONFIG.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.1}>
              <div className="text-center">
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-primary-light)]"
                />
                <p className="font-body text-sm md:text-base text-[var(--color-text-on-dark)]/80 mt-2">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
