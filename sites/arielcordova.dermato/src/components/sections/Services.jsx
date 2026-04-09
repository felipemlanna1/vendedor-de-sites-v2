import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { Heart, Scissors, Sparkles } from 'lucide-react'

const pillars = [
  { key: 'clinical', icon: Heart, color: 'var(--color-secondary)' },
  { key: 'surgical', icon: Scissors, color: 'var(--color-primary)' },
  { key: 'aesthetic', icon: Sparkles, color: 'var(--color-accent)' },
]

export default function Services() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <Section id="services" background="bg-[var(--color-background)]">
      <div className="text-center mb-16">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-4">
            {t('services.label')}
          </p>
        </ScrollReveal>
        <AnimatedText
          text={t('services.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight mb-4"
        />
        <ScrollReveal delay={0.2}>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-[60ch] mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map(({ key, icon: Icon, color }, i) => {
          const items = t(`services.${key}.items`).split(', ')
          const isActive = activeIndex === i

          return (
            <ScrollReveal key={key} delay={i * 0.15}>
              <motion.div
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                className="group relative p-6 md:p-8 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-primary-light)]/20 hover:border-[var(--color-primary)]/30 transition-all duration-300 cursor-default"
                style={{
                  boxShadow: isActive ? '0 12px 40px rgba(45, 41, 38, 0.12)' : '0 2px 12px rgba(45, 41, 38, 0.06)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>

                <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                  {t(`services.${key}.title`)}
                </h3>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {t(`services.${key}.description`)}
                </p>

                <ul className="space-y-2">
                  {items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="text-center mt-12">
          <Button
            href="https://wa.me/5548991232270?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os."
            variant="secondary"
          >
            {t('nav.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
