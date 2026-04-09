import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import SlideReveal from '../ui/SlideReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { Stethoscope, Scissors, Sparkles, ScanSearch } from 'lucide-react'

const ICONS = {
  Stethoscope,
  Scissors,
  Sparkles,
  ScanSearch,
}

const SERVICE_KEYS = ['clinica', 'cirurgica', 'estetica', 'diagnostico']

export default function Services() {
  const { t } = useTranslation()

  return (
    <Section id="services" background="bg-[var(--color-surface)]">
      <ScrollReveal>
        <p className="text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4">
          {t('services.label')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('services.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--color-text-primary)]"
      />

      <ScrollReveal delay={0.1}>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-[60ch]">
          {t('services.subtitle')}
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {SERVICE_KEYS.map((key, i) => {
          const iconNames = ['Stethoscope', 'Scissors', 'Sparkles', 'ScanSearch']
          const Icon = ICONS[iconNames[i]]
          const isHighlight = key === 'diagnostico'

          const Wrapper = isHighlight ? SlideReveal : ScrollReveal
          return (
            <Wrapper key={key} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`group relative p-6 md:p-8 rounded-2xl border transition-all h-full ${
                  isHighlight
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-background)] border-[var(--color-border-light)] hover:border-[var(--color-secondary)]/30'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isHighlight
                      ? 'bg-white/10'
                      : 'bg-[var(--color-primary)]/[0.06]'
                  }`}
                >
                  <Icon
                    size={24}
                    className={isHighlight ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`font-display text-xl md:text-2xl font-semibold mb-3 ${
                    isHighlight ? 'text-white' : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {t(`services.${key}_title`)}
                </h3>

                {/* Description */}
                <p
                  className={`leading-relaxed ${
                    isHighlight ? 'text-white/80' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {t(`services.${key}_desc`)}
                </p>

                {/* Highlight badge for diagnostico */}
                {isHighlight && (
                  <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold uppercase tracking-wider">
                    Diferencial UNA
                  </div>
                )}
              </motion.div>
            </Wrapper>
          )
        })}
      </div>

      <ScrollReveal delay={0.4} className="mt-10 text-center">
        <Button href={siteData.whatsappLink} variant="secondary">
          {t('services.cta')}
        </Button>
      </ScrollReveal>
    </Section>
  )
}
