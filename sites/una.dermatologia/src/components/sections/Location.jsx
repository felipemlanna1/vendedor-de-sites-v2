import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { MapPin, Phone, MessageCircle } from 'lucide-react'

export default function Location() {
  const { t } = useTranslation()

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.address.full)}`

  return (
    <Section id="location" background="bg-[var(--color-surface)]">
      <ScrollReveal>
        <p className="text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4">
          {t('location.label')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('location.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--color-text-primary)]"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Map embed */}
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border-light)] aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] w-full max-w-full">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.1!2d${siteData.coordinates.lng}!3d${siteData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM1JzQzLjQiUyA0OMKwMzInNTMuMCJX!5e0!3m2!1spt-BR!2sbr!4v1`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="UNA Dermatologia - Localizacao"
              className="w-full h-full min-h-[300px] max-w-full"
            />
          </div>
        </ScrollReveal>

        {/* Contact info */}
        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/[0.06] flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text-primary)]">{t('location.address')}</p>
                <p className="text-[var(--color-text-secondary)] mt-1">{t('location.neighborhood')}</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{t('location.zip')}</p>
                <p className="text-sm text-[var(--color-secondary)] font-medium mt-1">{t('location.reference')}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/[0.06] flex items-center justify-center flex-shrink-0">
                <Phone size={22} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-medium mb-1">
                  {t('location.phone_label')}
                </p>
                <a href={siteData.phoneLink} className="inline-block font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors py-2.5 min-h-[44px]">
                  {siteData.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/[0.06] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={22} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-medium mb-1">
                  {t('location.whatsapp_label')}
                </p>
                <a href={siteData.whatsappLink} className="inline-block font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors py-2.5 min-h-[44px]">
                  {siteData.whatsapp}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Button href={mapsUrl} variant="secondary" className="w-full sm:w-auto">
              {t('location.open_maps')}
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
