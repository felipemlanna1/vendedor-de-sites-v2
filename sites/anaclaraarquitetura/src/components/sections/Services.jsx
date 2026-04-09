import { useTranslation } from 'react-i18next'
import { Ruler, Palette, Hammer, MessageSquare } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { siteData } from '../../data/content'

const ICONS = { Ruler, Palette, Hammer, MessageSquare }
const SERVICE_KEYS = ['projetos', 'interiores', 'reformas', 'consultorias']

function ServiceCard({ serviceKey, icon, index }) {
  const { t } = useTranslation()
  const Icon = ICONS[icon]

  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="group relative p-6 md:p-8 bg-[var(--color-background)] border border-transparent hover:border-[var(--color-accent-text)]/30 transition-all duration-300 hover:-translate-y-1">
        {/* Accent line top */}
        <div className="absolute top-0 left-0 w-0 h-0.5 bg-[var(--color-accent-text)] group-hover:w-full transition-all duration-500" />

        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center mb-5">
          {Icon && (
            <Icon
              size={28}
              strokeWidth={1.5}
              className="text-[var(--color-primary)] group-hover:text-[var(--color-accent-text)] transition-colors"
            />
          )}
        </div>

        {/* Content */}
        <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          {t(`services.items.${serviceKey}.name`)}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
          {t(`services.items.${serviceKey}.description`)}
        </p>
      </div>
    </ScrollReveal>
  )
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <Section id="servicos" background="bg-[var(--color-surface)]">
      <ScrollReveal>
        <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-text)] mb-4">
          {t('services.label')}
        </span>
      </ScrollReveal>

      <AnimatedText
        text={t('services.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight max-w-2xl"
      />

      <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-4 md:gap-6">
        {SERVICE_KEYS.map((key, i) => {
          const service = siteData.services.find((s) => s.id === key)
          return (
            <ServiceCard
              key={key}
              serviceKey={key}
              icon={service?.icon || 'Ruler'}
              index={i}
            />
          )
        })}
      </div>

      <ScrollReveal delay={0.2} className="mt-12 text-center">
        <Button href={siteData.whatsappLink}>
          {t('services.cta')}
        </Button>
      </ScrollReveal>
    </Section>
  )
}
