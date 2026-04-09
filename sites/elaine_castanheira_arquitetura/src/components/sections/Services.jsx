import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { Ruler, Lightbulb, HardHat } from 'lucide-react'

const serviceIcons = {
  interiores: Ruler,
  consultoria: Lightbulb,
  acompanhamento: HardHat,
}

const serviceKeys = ['interiores', 'consultoria', 'acompanhamento']

export default function Services() {
  const { t } = useTranslation()

  return (
    <Section id="servicos" background="bg-[var(--color-background)]">
      <div className="mb-12 md:mb-16">
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary)] mb-4">
          {t('services.label')}
        </p>
        <AnimatedText
          text={t('services.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight max-w-2xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {serviceKeys.map((key, i) => {
          const Icon = serviceIcons[key]
          return (
            <ScrollReveal key={key} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group p-8 lg:p-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-secondary)]/30 hover:border-[var(--color-primary)]/30 transition-colors h-full"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-medium text-[var(--color-text-primary)] mb-4">
                  {t(`services.items.${key}.name`)}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base">
                  {t(`services.items.${key}.description`)}
                </p>
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}
