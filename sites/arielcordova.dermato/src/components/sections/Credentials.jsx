import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import CountUp from '../ui/CountUp'
import { Star, MessageCircle, Instagram, Calendar } from 'lucide-react'

const stats = [
  { key: 'rating', end: 5.0, decimals: 1, icon: Star },
  { key: 'reviews', end: 27, decimals: 0, icon: MessageCircle },
  { key: 'followers', end: 3061, decimals: 0, icon: Instagram },
  { key: 'experience', end: 2016, decimals: 0, icon: Calendar, isYear: true },
]

const credentialKeys = ['ufsc', 'residencia', 'mestrado', 'preceptora', 'sbd', 'eadv', 'cbd', 'crm']

export default function Credentials() {
  const { t } = useTranslation()

  return (
    <Section id="credentials" background="bg-[var(--color-background)]">
      <div className="text-center mb-16">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-4">
            {t('credentials.label')}
          </p>
        </ScrollReveal>
        <AnimatedText
          text={t('credentials.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
        {stats.map(({ key, end, decimals, icon: Icon }, i) => (
          <ScrollReveal key={key} delay={i * 0.1}>
            <div className="text-center p-4 md:p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <Icon size={24} className="text-[var(--color-accent)] mx-auto mb-3" />
              <div className="font-[var(--font-display)] text-2xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                <CountUp end={end} decimals={decimals} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-tight">
                {t(`credentials.stats.${key}_label`)}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
          {credentialKeys.map((key) => (
            <div key={key} className="inline-flex items-center gap-2 py-2 px-3 md:px-4 rounded-full border border-[var(--color-secondary)]/20 hover:bg-[var(--color-surface)] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] flex-shrink-0" />
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
                {t(`credentials.items.${key}`)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}
