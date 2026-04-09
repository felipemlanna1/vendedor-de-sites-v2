import { useTranslation } from 'react-i18next'
import { MessageCircle, Instagram, MapPin, Award } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Contact() {
  const { t } = useTranslation()

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  return (
    <section
      id="contact"
      className="px-5 py-[var(--space-section)] md:px-8 lg:px-16 bg-[var(--color-background)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedText
          text={t('contact.title')}
          tag="h2"
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)] mb-4"
        />
        <ScrollReveal delay={0.2}>
          <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] mb-10 md:mb-14">
            {t('contact.subtitle')}
          </p>
        </ScrollReveal>

        {/* CTA buttons */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="gap-3"
            >
              <MessageCircle size={18} />
              {t('contact.whatsapp_cta')}
            </Button>
            <Button
              href={siteData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="gap-3"
            >
              <Instagram size={18} />
              {t('contact.instagram_cta')}
            </Button>
          </div>
        </ScrollReveal>

        {/* Info cards */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center gap-3 justify-center">
              <MapPin size={16} className="text-[var(--color-primary)]" />
              <span className="font-body text-sm text-[var(--color-text-secondary)]">
                {t('contact.location')}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Award size={16} className="text-[var(--color-primary)]" />
              <span className="font-body text-sm text-[var(--color-text-secondary)]">
                {t('contact.cro')}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Instagram size={16} className="text-[var(--color-primary)]" />
              <span className="font-body text-sm text-[var(--color-text-secondary)]">
                {t('contact.instagram_handle')}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
