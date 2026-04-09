import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { Phone, MapPin, Clock, CreditCard, Video } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <Section id="contact" background="bg-[var(--color-background)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-4">
              {t('contact.label')}
            </p>
          </ScrollReveal>
          <AnimatedText
            text={t('contact.title')}
            tag="h2"
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight mb-4"
          />
          <ScrollReveal delay={0.15}>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              {t('contact.subtitle')}
            </p>
          </ScrollReveal>

          <div className="space-y-4 mb-8">
            <ScrollReveal delay={0.25}>
              <Button
                href={`https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent('Ol\u00e1, gostaria de agendar uma consulta com a Dra. Ariel.')}`}
                variant="primary"
                className="w-full sm:w-auto justify-center"
              >
                {t('contact.whatsapp_cta')}
              </Button>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Button
                href={t('contact.doctoralia_url')}
                variant="secondary"
                className="w-full sm:w-auto justify-center"
              >
                {t('contact.doctoralia_cta')}
              </Button>
            </ScrollReveal>
          </div>
        </div>

        <div className="space-y-4">
          <ScrollReveal delay={0.2}>
            <div className="flex items-start gap-4 p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <Phone size={22} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-0.5">{t('contact.phone_label')}</p>
                <a href={`tel:${siteData.phoneClinic}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-1 inline-block min-h-[44px] flex items-center">
                  {t('contact.phone')}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="flex items-start gap-4 p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <MapPin size={22} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-0.5">UNA Dermatologia</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{t('contact.address')}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex items-start gap-4 p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <Clock size={22} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-0.5">{t('contact.hours')}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="flex items-start gap-4 p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <CreditCard size={22} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">{t('contact.payment')}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex items-start gap-4 p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <Video size={22} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">{t('contact.telemedicine')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-16 rounded-[var(--radius-xl)] overflow-hidden h-64 md:h-80 bg-[var(--color-surface)]">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.7!2d${siteData.coordinates.lng}!3d${siteData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM1JzE5LjciUyA0OMKwMzInNDguMyJX!5e0!3m2!1spt-BR!2sbr!4v1`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="UNA Dermatologia - Mapa"
          />
        </div>
      </ScrollReveal>
    </Section>
  )
}
