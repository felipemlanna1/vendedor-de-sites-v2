import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { siteData } from '../../data/content'
import { MapPin, Phone, MessageCircle, Instagram } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <Section id="contact" background="bg-[var(--color-background)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: info */}
        <div>
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-3">
              {t('contact.subtitle')}
            </p>
          </ScrollReveal>

          <AnimatedText
            text={t('contact.title')}
            tag="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] leading-tight"
          />

          <div className="mt-8 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{t('contact.address')}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t('contact.zip')}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{t('contact.phone')}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Instagram size={22} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <a
                    href={siteData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[44px] font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {t('contact.instagram')}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href={siteData.whatsappLink} variant="whatsapp">
                <MessageCircle size={20} />
                {t('contact.whatsapp_cta')}
              </Button>
              <Button
                href={siteData.mapsUrl}
                variant="secondary"
              >
                <MapPin size={18} />
                {t('contact.map_cta')}
              </Button>
            </div>
          </ScrollReveal>

          {/* Final emotional CTA */}
          <ScrollReveal delay={0.5}>
            <p className="mt-10 text-xl md:text-2xl font-bold text-[var(--color-primary)] italic" style={{ fontFamily: 'var(--font-display)' }}>
              {t('contact.final_cta')}
            </p>
          </ScrollReveal>
        </div>

        {/* Right: map embed */}
        <ScrollReveal direction="right">
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] h-full min-h-[400px]">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(siteData.address.full)}`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
