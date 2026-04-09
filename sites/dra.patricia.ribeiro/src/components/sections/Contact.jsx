import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { RaizDecorativa } from '../ui/RaizViva'
import { siteData } from '../../data/content'
import { MessageCircle, MapPin, Award, Instagram } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-36 bg-[var(--color-primary-dark)] overflow-hidden">
      {/* Raiz decorativa como textura de fundo */}
      <RaizDecorativa
        className="absolute right-8 top-16 opacity-10 hidden lg:block"
        color="var(--color-accent)"
        size={250}
      />

      <div className="relative mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        {/* Split: info esquerda + imagem direita */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Info + CTA */}
          <div className="w-full lg:w-[55%]">
            <ScrollReveal>
              <span className="text-sm font-medium text-[var(--color-accent)] tracking-wide uppercase block mb-4">
                {t('contact.label')}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-white mb-6 leading-tight">
                {t('contact.title')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base md:text-lg text-[var(--color-accent)] leading-relaxed mb-10 max-w-lg">
                {t('contact.description')}
              </p>
            </ScrollReveal>

            {/* CTA WhatsApp grande */}
            <ScrollReveal delay={0.3}>
              <Button href={siteData.whatsappUrl} variant="whatsapp" className="text-lg px-10 py-4 mb-10">
                <MessageCircle size={22} />
                {t('contact.whatsapp_cta')}
              </Button>
            </ScrollReveal>

            {/* Info cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollReveal delay={0.4}>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[var(--color-accent)] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[var(--color-accent)] uppercase tracking-wider">{t('contact.location_label')}</p>
                    <p className="text-sm font-medium text-white">{t('contact.location')}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.45}>
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-[var(--color-accent)] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[var(--color-accent)] uppercase tracking-wider">{t('contact.cro_label')}</p>
                    <p className="text-sm font-medium text-white">{t('contact.cro')}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <motion.a
                  href={siteData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3"
                >
                  <Instagram size={18} className="text-[var(--color-accent)] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[var(--color-accent)] uppercase tracking-wider">{t('contact.instagram_label')}</p>
                    <p className="text-sm font-medium text-white">{t('contact.instagram')}</p>
                  </div>
                </motion.a>
              </ScrollReveal>
            </div>
          </div>

          {/* Imagem do consultorio */}
          <div className="w-full lg:w-[45%]">
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
                <img
                  src={siteData.images.contact}
                  alt="Consultório da Dra. Patrícia Ribeiro em Santa Rita do Sapucaí"
                  className="w-full aspect-square object-cover"
                  loading="eager"
                  width="640"
                  height="640"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
