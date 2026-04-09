import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import CountUp from '../ui/CountUp'
import Section from '../layout/Section'

const DIFF_KEYS = ['pesquisa', 'formacao', 'docencia', 'dedicacao']

function DiffCard({ diffKey, index }) {
  const { t } = useTranslation()

  const stat = parseInt(t(`differentials.items.${diffKey}.stat`), 10)
  const suffix = diffKey === 'dedicacao' ? '%' : ''
  const isLarge = index === 0

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className={`group relative p-6 md:p-8 lg:p-10 border border-[var(--color-primary-light)]/10 hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:-translate-y-1 ${
          isLarge ? 'sm:col-span-2' : ''
        }`}
      >
        <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent-on-dark)] mb-4">
          <CountUp end={stat} duration={2} suffix={suffix} />
        </div>
        <p className="text-sm font-medium tracking-wide uppercase text-[var(--color-primary-light)] mb-4">
          {t(`differentials.items.${diffKey}.statLabel`)}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-background)] mb-3">
          {t(`differentials.items.${diffKey}.title`)}
        </h3>
        <p className="text-[var(--color-background)]/80 text-sm md:text-base leading-relaxed">
          {t(`differentials.items.${diffKey}.description`)}
        </p>
      </div>
    </ScrollReveal>
  )
}

export default function Differentials() {
  const { t } = useTranslation()

  return (
    <Section
      id="diferenciais"
      background="bg-[var(--color-secondary)] grain-overlay"
    >
      <ScrollReveal>
        <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-on-dark)] mb-4">
          {t('differentials.label')}
        </span>
      </ScrollReveal>

      <AnimatedText
        text={t('differentials.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-background)] tracking-tight max-w-2xl"
      />

      <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-4 md:gap-6">
        {DIFF_KEYS.map((key, i) => (
          <DiffCard key={key} diffKey={key} index={i} />
        ))}
      </div>
    </Section>
  )
}
