import { useTranslation } from 'react-i18next'
import { MapPin, Clock, MessageCircle, Instagram } from 'lucide-react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Contact() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(siteData.whatsappMessage)}`

  return (
    <Section id="contact" background="bg-[var(--color-primary-dark)]">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        {/* Left — Text + CTA */}
        <div>
          <ScrollReveal>
            <span className="mb-3 inline-block font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-background)]">
              {t('contact.title')}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mb-6 font-[var(--font-display)] text-3xl font-medium leading-tight tracking-tight text-[var(--color-background)] md:text-5xl">
              {t('contact.subtitle')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mb-8 flex flex-col gap-5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[var(--color-background)]/80 transition-colors hover:text-[var(--color-secondary)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                  <MessageCircle className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <p className="font-[var(--font-body)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('contact.phone_label')}
                  </p>
                  <p className="font-[var(--font-body)] text-base font-medium">
                    +55 48 99923-5973
                  </p>
                </div>
              </a>

              <a
                href={siteData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[var(--color-background)]/80 transition-colors hover:text-[var(--color-secondary)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                  <Instagram className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <p className="font-[var(--font-body)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    Instagram
                  </p>
                  <p className="font-[var(--font-body)] text-base font-medium">
                    {siteData.instagram}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-[var(--color-background)]/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                  <MapPin className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <p className="font-[var(--font-body)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('contact.address_label')}
                  </p>
                  <p className="font-[var(--font-body)] text-base font-medium">
                    {t('contact.address')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[var(--color-background)]/80">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/20">
                  <Clock className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <div>
                  <p className="font-[var(--font-body)] text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('contact.hours_label')}
                  </p>
                  <p className="font-[var(--font-body)] text-base font-medium">
                    {t('contact.hours')}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl} variant="primary">
                {t('contact.whatsapp_cta')}
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Profile image + map embed */}
        <div className="flex flex-col gap-6">
          <ScrollReveal direction="right">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/profile-marcella.jpg"
                alt="Dra. Marcella Melro, cirurgiã-dentista integrativa"
                width={600}
                height={400}
                className="aspect-square w-full object-cover"
                decoding="async"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="overflow-hidden rounded-2xl">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28540.39!2d${siteData.coordinates.lng}!3d${siteData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaedba52b7c21%3A0xac85b0750e3acac0!2sBlumenau%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1`}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                decoding="async"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Blumenau SC"
                className="w-full rounded-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
