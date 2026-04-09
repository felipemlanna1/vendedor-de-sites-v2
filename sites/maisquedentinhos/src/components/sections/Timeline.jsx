import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Section from '../layout/Section'
import { siteData } from '../../data/content'

function TimelineItem({ itemKey, index, isLast }) {
  const { t } = useTranslation()

  return (
    <ScrollReveal delay={index * 0.12}>
      <div className="relative flex gap-6 md:gap-8">
        {/* Timeline line + dot */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, type: 'spring', stiffness: 300 }}
            className="w-4 h-4 rounded-full bg-[var(--color-primary)] flex-shrink-0 z-10 ring-4 ring-[var(--color-background)]"
          />
          {!isLast && (
            <div className="w-0.5 flex-1 bg-[var(--color-primary)]/20 min-h-[60px]" />
          )}
        </div>

        {/* Content */}
        <div className="pb-10 md:pb-12">
          <span className="inline-block text-sm font-bold text-[var(--color-primary)] mb-1 tracking-wider">
            {t(`timeline.items.${itemKey}.year`)}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {t(`timeline.items.${itemKey}.title`)}
          </h3>
          <p className="mt-2 text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
            {t(`timeline.items.${itemKey}.description`)}
          </p>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Timeline() {
  const { t } = useTranslation()

  return (
    <Section id="credentials" background="bg-[var(--color-background)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: heading */}
        <div>
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-3">
              {t('timeline.title')}
            </p>
          </ScrollReveal>
          <AnimatedText
            text={t('timeline.subtitle')}
            tag="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] leading-tight"
          />
        </div>

        {/* Right: timeline */}
        <div className="flex flex-col">
          {siteData.timeline.map((item, i) => (
            <TimelineItem
              key={item.key}
              itemKey={item.key}
              index={i}
              isLast={i === siteData.timeline.length - 1}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
