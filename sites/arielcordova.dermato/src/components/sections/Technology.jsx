import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { Scan, Waves, Search } from 'lucide-react'

const techs = [
  { key: 'fotofinder', icon: Scan, number: '01' },
  { key: 'ultrasound', icon: Waves, number: '02' },
  { key: 'confocal', icon: Search, number: '03' },
]

export default function Technology() {
  const { t } = useTranslation()

  return (
    <Section id="technology" background="bg-[var(--color-secondary)]">
      <div className="mb-16">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-4">
            {t('technology.label')}
          </p>
        </ScrollReveal>
        <AnimatedText
          text={t('technology.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4"
        />
        <ScrollReveal delay={0.2}>
          <p className="text-base md:text-lg text-white/70 max-w-[55ch] leading-relaxed">
            {t('technology.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {techs.map(({ key, icon: Icon, number }, i) => (
          <ScrollReveal key={key} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="p-6 md:p-8 rounded-[var(--radius-xl)] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                  <Icon size={24} className="text-[var(--color-accent)]" />
                </div>
                <span className="font-[var(--font-display)] text-4xl font-bold text-white/10">
                  {number}
                </span>
              </div>

              <h3 className="font-[var(--font-display)] text-lg font-semibold text-white mb-3">
                {t(`technology.${key}.title`)}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed">
                {t(`technology.${key}.description`)}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
