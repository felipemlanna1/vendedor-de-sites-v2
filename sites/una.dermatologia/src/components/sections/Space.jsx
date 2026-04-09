import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { Clock, CreditCard } from 'lucide-react'

export default function Space() {
  const { t } = useTranslation()

  return (
    <Section id="space" background="bg-[var(--color-background)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left - Typographic design (no interior photos available) */}
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/[0.04] to-[var(--color-secondary)]/[0.06] p-10 md:p-16 aspect-[4/3] flex items-center justify-center">
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-20 h-20 border border-[var(--color-secondary)]/20 rounded-full" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border border-[var(--color-primary)]/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-secondary)]/[0.04] rounded-full blur-2xl" />

            <div className="relative text-center">
              <p className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-[var(--color-primary)]/30 leading-none">
                UNA
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                Estacao Milano
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right - Content */}
        <div>
          <ScrollReveal>
            <p className="text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4">
              {t('space.label')}
            </p>
          </ScrollReveal>

          <AnimatedText
            text={t('space.title')}
            tag="h2"
            className="font-display text-3xl md:text-4xl font-semibold leading-tight text-[var(--color-text-primary)]"
          />

          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t('space.paragraph')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/[0.06] flex items-center justify-center">
                  <Clock size={20} className="text-[var(--color-primary)]" />
                </div>
                <span className="text-[var(--color-text-secondary)] font-medium">
                  {t('space.atendimento')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/[0.06] flex items-center justify-center">
                  <CreditCard size={20} className="text-[var(--color-primary)]" />
                </div>
                <span className="text-[var(--color-text-secondary)] font-medium">
                  {t('space.particular')}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
