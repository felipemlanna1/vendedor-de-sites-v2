import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData, mapEmbedUrl, directionsUrl } from '../../data/content'
import { MapPin, Clock, Navigation } from 'lucide-react'

export default function Location() {
  const { t } = useTranslation()

  return (
    <Section id="localizacao" background="bg-white">
      <ScrollReveal>
        <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
          {t('location.sectionLabel')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('location.title')}
        tag="h2"
        className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-12"
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Map */}
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localizacao OUROClin — Dra. Milena Grossi"
            />
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col justify-center h-full">
            {/* Main location */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin size={18} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-text-primary)]">
                    {t('location.clinic')}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mt-1">{t('location.address')}</p>
                  <p className="text-[var(--color-text-secondary)]">{t('location.city')}</p>
                </div>
              </div>
            </div>

            {/* SP note */}
            <div className="mb-8 p-4 bg-[var(--color-background)] rounded-xl">
              <p className="text-sm text-[var(--color-text-muted)] italic">
                {t('location.spNote')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button href={directionsUrl}>
                <Navigation size={16} />
                {t('location.cta')}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
