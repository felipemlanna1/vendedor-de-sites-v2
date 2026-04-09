import { useTranslation } from 'react-i18next'
import { MessageCircle, MapPin, Instagram, Award } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { business, social, images } from '../../data/content'

export default function Contact() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  return (
    <Section id="contato" background="bg-[var(--color-primary-dark)]" className="relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-secondary)]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left — Text and CTA */}
        <div className="flex-1 text-center lg:text-left">
          <AnimatedText
            text={t('contact.title')}
            tag="h2"
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight"
          />

          <ScrollReveal delay={0.15}>
            <p className="mt-4 font-body text-lg text-white/85 max-w-[45ch]">
              {t('contact.subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-8">
              <Button href={whatsappUrl} variant="whatsapp" className="text-base">
                <MessageCircle className="w-5 h-5" />
                {t('contact.whatsappCta')}
              </Button>
              <p className="mt-3 font-body text-sm text-white/70">
                {t('contact.whatsappSubtext')}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Info card */}
        <ScrollReveal direction="right" className="w-full lg:w-auto">
          <div className="bg-[var(--color-surface)]/10 backdrop-blur-sm rounded-[var(--radius-xl)] p-8 md:p-10 border border-white/10 max-w-md mx-auto lg:mx-0">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span className="font-body text-base text-white">
                  {t('contact.region')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span className="font-body text-base text-white">
                  {t('contact.cro')}
                </span>
              </div>

              <a
                href={t('contact.instagramUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-1.5 min-h-[44px] font-body text-base text-white hover:text-[var(--color-accent)] transition-colors"
              >
                <Instagram className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span>{t('contact.instagram')}</span>
              </a>
            </div>

            {/* Clinic image */}
            <div className="mt-6 rounded-[var(--radius-md)] overflow-hidden">
              <img
                src={images.contact}
                alt="Recepção da clínica A Fada do Dente"
                className="w-full aspect-[9/16] object-cover object-center rounded-[var(--radius-md)]"
                loading="eager"
                decoding="async"
                width={360}
                height={640}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
