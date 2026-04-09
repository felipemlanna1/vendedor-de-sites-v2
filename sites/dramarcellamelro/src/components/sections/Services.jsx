import { useTranslation } from 'react-i18next'
import { Stethoscope, ScanLine, HeartPulse, Sparkles, Baby, ShieldCheck } from 'lucide-react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

const iconMap = {
  Stethoscope,
  ScanLine,
  HeartPulse,
  Sparkles,
  Baby,
  ShieldCheck,
}

/* Services use icons only — Instagram photos are casual and not professional enough for service listings */

export default function Services() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(siteData.whatsappMessage)}`

  return (
    <Section id="services" background="bg-[var(--color-surface)]">
      <div className="mb-12 text-center md:mb-16">
        <ScrollReveal>
          <span className="mb-3 inline-block font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
            {t('services.title')}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mx-auto max-w-2xl font-[var(--font-display)] text-3xl font-medium leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            {t('services.subtitle')}
          </h2>
        </ScrollReveal>
      </div>

      {/* Icon-based card grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteData.services.map((service, i) => {
          const Icon = iconMap[service.icon]

          return (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <div className="group relative rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-background)] p-8 transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 transition-colors group-hover:bg-[var(--color-primary)]/20">
                  {Icon && <Icon className="h-7 w-7 text-[var(--color-primary-dark)]" strokeWidth={1.5} />}
                </div>
                <h3 className="mb-3 font-[var(--font-display)] text-xl font-medium text-[var(--color-text-primary)] md:text-2xl">
                  {t(`services.items.${service.id}.name`)}
                </h3>
                <p className="font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                  {t(`services.items.${service.id}.description`)}
                </p>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.2}>
        <div className="mt-16 text-center md:mt-20">
          <Button href={whatsappUrl} variant="primary">
            {t('services.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
