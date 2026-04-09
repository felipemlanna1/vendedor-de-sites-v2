import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { MapPin, Phone, Calendar } from 'lucide-react'

export default function Clinic() {
  const { t } = useTranslation()

  return (
    <Section id="clinic" background="bg-[var(--color-surface)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left - typographic visual instead of low-quality image */}
        <ScrollReveal>
          <div className="relative rounded-[var(--radius-xl)] bg-[var(--color-secondary)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary-dark)] opacity-90" />
            <div className="relative z-10 text-center py-12 md:py-20 px-8 md:px-12">
              <p className="font-[var(--font-display)] text-6xl md:text-8xl font-bold text-white/10 mb-4">UNA</p>
              <p className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-white tracking-wide">Dermatologia</p>
              <div className="w-16 h-px bg-[var(--color-accent)] mx-auto my-6" />
              <p className="text-sm text-white/70 italic max-w-[30ch] mx-auto">{t('clinic.subtitle')}</p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-[var(--radius-lg)] mt-6">
                <p className="font-[var(--font-display)] text-xs md:text-sm font-medium opacity-80">Fundada em</p>
                <p className="font-[var(--font-display)] text-xl md:text-2xl font-bold">{siteData.clinic.founded}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right - text */}
        <div>
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-4">
              {t('clinic.label')}
            </p>
          </ScrollReveal>
          <AnimatedText
            text={t('clinic.title')}
            tag="h2"
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight mb-6"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              {t('clinic.description')}
            </p>
          </ScrollReveal>

          <div className="space-y-4 mb-8">
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <MapPin size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-sm">{t('clinic.address')}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Phone size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-sm">{t('clinic.phone')}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Calendar size={20} className="text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-sm">{t('contact.hours')}</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.45}>
            <Button href={siteData.clinic.instagramUrl} variant="secondary">
              @una.dermatologia
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
