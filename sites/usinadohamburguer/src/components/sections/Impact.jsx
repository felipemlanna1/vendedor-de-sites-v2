import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import AnimatedText from '../ui/AnimatedText'
import CountUp from '../ui/CountUp'
import ScrollReveal from '../ui/ScrollReveal'
import { impactNumbers } from '../../data/content'

const stats = [
  { key: 'donated', end: impactNumbers.donated, prefix: 'R$ ', suffix: '+' },
  { key: 'years', end: impactNumbers.years, suffix: ' anos' },
  { key: 'locations_count', end: impactNumbers.locations, suffix: '' },
  { key: 'reviews_count', end: impactNumbers.reviews, suffix: '+' },
]

export default function Impact() {
  const { t } = useTranslation()

  return (
    <Section id="impacto" background="bg-[var(--color-secondary)]" className="text-white">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <AnimatedText
          text={t('impact.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6"
        />
        <ScrollReveal>
          <p className="text-white/60 text-lg leading-relaxed">
            {t('impact.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.key} delay={i * 0.15} className="text-center">
            <CountUp
              end={stat.end}
              prefix={stat.prefix || ''}
              suffix={stat.suffix}
              className="font-[var(--font-display)] text-3xl md:text-5xl font-bold text-[var(--color-primary-light)] block"
            />
            <p className="text-white/50 text-sm md:text-base mt-2">
              {t(`impact.${stat.key}`)}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
