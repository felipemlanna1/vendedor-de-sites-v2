import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Sparkles, Zap, Heart, Leaf, Scissors, Diamond, Star } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

const ICON_MAP = {
  Sparkles,
  Zap,
  Heart,
  Leaf,
  Scissors,
  Diamond,
  Star,
}

export default function Services() {
  const { t } = useTranslation()

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  return (
    <section
      id="services"
      className="px-5 py-[var(--space-section)] md:px-8 lg:px-16 bg-[var(--color-background)]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedText
            text={t('services.title')}
            tag="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)] mb-4"
          />
          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
              {t('services.subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {siteData.services.map((service, i) => {
            const Icon = ICON_MAP[service.icon]
            return (
              <ScrollReveal key={service.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 md:p-8 border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-lg)] transition-all duration-500 h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)]/15 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary-light)]/25 transition-colors duration-500">
                    {Icon && (
                      <Icon
                        size={22}
                        className="text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                    {t(`services.items.${service.id}.name`)}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed flex-1">
                    {t(`services.items.${service.id}.description`)}
                  </p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12 md:mt-16">
            <p className="font-body text-lg text-[var(--color-text-secondary)] mb-6">
              {t('services.cta')}
            </p>
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              {t('hero.cta')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
