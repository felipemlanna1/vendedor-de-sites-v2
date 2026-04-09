import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { MessageCircle, MapPin, Instagram } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { siteData } from '../../data/content'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <Section id="contato" background="bg-[var(--color-background)]">
      <div className="text-center max-w-2xl mx-auto">
        {/* Label */}
        <ScrollReveal>
          <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-text)] mb-4">
            {t('contact.label')}
          </span>
        </ScrollReveal>

        {/* Title */}
        <AnimatedText
          text={t('contact.title')}
          tag="h2"
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight"
        />

        {/* Description */}
        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
            {t('contact.description')}
          </p>
        </ScrollReveal>

        {/* WhatsApp CTA - main */}
        <ScrollReveal delay={0.2} className="mt-10">
          <Button
            href={siteData.whatsappLink}
            className="text-base md:text-lg px-10 py-4"
          >
            <MessageCircle size={20} />
            {t('contact.whatsapp_cta')}
          </Button>
        </ScrollReveal>

        {/* Phone */}
        <ScrollReveal delay={0.3}>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            {t('contact.phone')}
          </p>
        </ScrollReveal>

        {/* Info grid */}
        <ScrollReveal delay={0.4} className="mt-12">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {/* Instagram */}
            <motion.a
              href={siteData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 bg-[var(--color-surface)] hover:bg-[var(--color-surface)]/80 transition-colors"
            >
              <Instagram size={24} className="text-[var(--color-accent-text)]" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {t('contact.instagram')}
              </span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={siteData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 bg-[var(--color-surface)] hover:bg-[var(--color-surface)]/80 transition-colors"
            >
              <MessageCircle size={24} className="text-[var(--color-accent-text)]" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {t('contact.phone')}
              </span>
            </motion.a>

            {/* Location */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 bg-[var(--color-surface)]"
            >
              <MapPin size={24} className="text-[var(--color-accent-text)]" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {t('contact.location')}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {t('contact.region')}
              </span>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
