import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { siteData } from '../../data/content'
import { Award, MapPin, BadgeCheck } from 'lucide-react'

export default function About() {
  const { t } = useTranslation()

  const credentials = [
    { icon: Award, text: t('about.credentials') },
    { icon: BadgeCheck, text: t('about.invisalignDoctor') },
    { icon: MapPin, text: t('about.locations') },
  ]

  return (
    <Section id="sobre">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        {/* Left: Images */}
        <ScrollReveal>
          <div className="relative">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/5]">
              <img
                src={siteData.images.about}
                alt="Dra. Milena em atendimento clinico"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Legacy image - offset */}
            <div className="absolute -bottom-6 right-0 md:-right-6 w-28 h-28 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-xl border-4 border-[var(--color-background)]">
              <img
                src={siteData.legacy.fatherImage}
                alt={`${siteData.legacy.father} — legado familiar`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Text */}
        <div>
          <ScrollReveal>
            <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
              {t('about.sectionLabel')}
            </p>
          </ScrollReveal>

          <AnimatedText
            text={t('about.title')}
            tag="h2"
            className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-8"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {t('about.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-base text-[var(--color-text-muted)] leading-relaxed mb-8 italic font-[var(--font-display)] text-lg">
              {t('about.legacy')}
            </p>
          </ScrollReveal>

          {/* Credentials */}
          <div className="space-y-4">
            {credentials.map((cred, i) => (
              <ScrollReveal key={i} delay={0.4 + i * 0.1}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <cred.icon size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{cred.text}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
