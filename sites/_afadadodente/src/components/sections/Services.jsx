import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Wand2, Sparkles, Crown, MoonStar } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { services, business } from '../../data/content'

const iconMap = {
  wand: Wand2,
  sparkles: Sparkles,
  crown: Crown,
  moonstar: MoonStar,
}

function ServiceCard({ serviceKey, icon, index }) {
  const { t } = useTranslation()
  const Icon = iconMap[icon] || Wand2

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 0 30px rgba(212, 168, 67, 0.15)' }}
        transition={{ duration: 0.3 }}
        className="group relative bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-7 md:p-8 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow h-full"
      >
        {/* Sparkle border glow on hover */}
        <div className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-secondary)]/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)]/25 flex items-center justify-center mb-5 group-hover:bg-[var(--color-accent)]/15 transition-colors">
            <Icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors" />
          </div>

          <h3 className="font-display font-semibold text-lg md:text-xl text-[var(--color-text-primary)] mb-3">
            {t(`services.items.${serviceKey}.name`)}
          </h3>

          <p className="font-body text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">
            {t(`services.items.${serviceKey}.description`)}
          </p>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  return (
    <Section id="servicos" background="bg-[var(--color-primary-light)]/8">
      <div className="text-center mb-12 md:mb-16">
        <AnimatedText
          text={t('services.title')}
          tag="h2"
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] tracking-tight"
        />
        <ScrollReveal delay={0.2}>
          <p className="mt-4 font-body text-base md:text-lg text-[var(--color-text-secondary)] max-w-[45ch] mx-auto">
            {t('services.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {services.map((service, i) => (
          <ServiceCard
            key={service.key}
            serviceKey={service.key}
            icon={service.icon}
            index={i}
          />
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="text-center mt-12">
          <Button href={whatsappUrl} variant="primary">
            {t('services.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
