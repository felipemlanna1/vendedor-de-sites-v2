import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData, whatsappLinks } from '../../data/content'
import { MessageCircle, Phone, Instagram } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <Section id="contato" background="bg-[var(--color-secondary)]/15">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
            {t('contact.sectionLabel')}
          </p>
        </ScrollReveal>

        <AnimatedText
          text={t('contact.title')}
          tag="h2"
          className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-4"
        />

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10">
            {t('contact.subtitle')}
          </p>
        </ScrollReveal>

        {/* CTA button */}
        <ScrollReveal delay={0.3}>
          <Button href={whatsappLinks.contact} className="text-lg px-10 py-4">
            <MessageCircle size={20} />
            {t('contact.whatsappCta')}
          </Button>
        </ScrollReveal>

        {/* Contact info */}
        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${siteData.phone}`}
              className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px] px-4 py-2"
            >
              <Phone size={18} />
              <span className="text-base">{t('contact.phone')}</span>
            </a>
            <a
              href={siteData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px] px-4 py-2"
            >
              <Instagram size={18} />
              <span className="text-base">{t('contact.instagram')}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
