import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Section from '../layout/Section'
import { siteData } from '../../data/content'
import { Baby, Ruler, Sparkles, Heart, Accessibility } from 'lucide-react'

const iconMap = {
  Baby,
  Ruler,
  Sparkles,
  Heart,
  Accessibility,
}

function ServiceCard({ serviceKey, icon, index }) {
  const { t } = useTranslation()
  const Icon = iconMap[icon]

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative bg-[var(--color-surface)] rounded-2xl p-6 md:p-8 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow h-full"
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)] transition-colors duration-300">
          {Icon && (
            <Icon
              size={28}
              className="text-[var(--color-primary)] group-hover:text-white transition-colors duration-300"
            />
          )}
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          {t(`services.${serviceKey}.name`)}
        </h3>

        {/* Description */}
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
          {t(`services.${serviceKey}.description`)}
        </p>

        {/* Detail quote */}
        <p className="text-sm italic text-[var(--color-primary)] mt-2 transition-transform duration-300 group-hover:translate-y-0">
          "{t(`services.${serviceKey}.detail`)}"
        </p>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <Section id="services" background="bg-[var(--color-background)]">
      <div className="text-center mb-12 md:mb-16">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-3">
            {t('services.title')}
          </p>
        </ScrollReveal>
        <AnimatedText
          text={t('services.subtitle')}
          tag="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] max-w-3xl mx-auto"
        />
      </div>

      {/* Feature image */}
      <ScrollReveal>
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg max-w-3xl mx-auto">
          <img
            src="/images/dentista-examinando-crianca.jpg"
            alt="Atendimento odontopediatrico especializado"
            className="w-full h-48 md:h-64 object-cover"
            loading="lazy"
            width={768}
            height={256}
          />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {siteData.services.map((service, i) => (
          <ServiceCard
            key={service.key}
            serviceKey={service.key}
            icon={service.icon}
            index={i}
          />
        ))}
      </div>
    </Section>
  )
}
