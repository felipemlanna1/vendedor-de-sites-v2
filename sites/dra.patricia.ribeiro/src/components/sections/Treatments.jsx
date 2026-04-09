import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { Stethoscope, RefreshCw, Scissors, AlertTriangle, Sparkles } from 'lucide-react'

const treatmentIcons = {
  canal: Stethoscope,
  retratamento: RefreshCw,
  cirurgia: Scissors,
  urgencia: AlertTriangle,
  restauracao: Sparkles,
}

// Bento grid: cards grandes e pequenos alternados
const gridSpans = [
  'md:col-span-2 md:row-span-1',  // canal — largo
  'md:col-span-1 md:row-span-1',  // retratamento
  'md:col-span-1 md:row-span-1',  // cirurgia
  'md:col-span-1 md:row-span-1',  // urgencia
  'md:col-span-2 md:row-span-1',  // restauracao — largo
]

export default function Treatments() {
  const { t } = useTranslation()

  return (
    <section id="treatments" className="py-20 md:py-28 lg:py-36 bg-[var(--color-background)]">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        <ScrollReveal>
          <span className="text-sm font-medium text-[var(--color-secondary)] tracking-wide uppercase block mb-4">
            {t('treatments.label')}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-[var(--color-primary-dark)] mb-12 md:mb-16 leading-tight max-w-2xl">
            {t('treatments.title')}
          </h2>
        </ScrollReveal>

        {/* Bento grid assimetrico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {siteData.services.map((service, i) => {
            const Icon = treatmentIcons[service.id]
            return (
              <ScrollReveal key={service.id} delay={i * 0.08} className={gridSpans[i]}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(27,77,110,0.12)' }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-[var(--color-surface)] rounded-2xl p-6 md:p-8 h-full border border-[var(--color-accent)]/20 hover:border-[var(--color-secondary)]/40 transition-colors"
                >
                  {/* Icone */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                    <Icon size={24} className="text-[var(--color-secondary)]" />
                  </div>

                  <h3 className="text-lg md:text-xl font-[var(--font-display)] font-semibold text-[var(--color-primary-dark)] mb-3">
                    {t(`treatments.items.${service.id}.name`)}
                  </h3>

                  <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                    {t(`treatments.items.${service.id}.description`)}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* CTA intermediario */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 md:mt-16 text-center">
            <Button href={siteData.whatsappUrl} variant="secondary">
              {t('treatments.cta_intermediate')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
