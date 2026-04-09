import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import CountUp from '../ui/CountUp'
import ScrollReveal from '../ui/ScrollReveal'
import { counters } from '../../data/content'

export default function Counters() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 md:py-24 bg-[var(--color-primary-dark)] overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {counters.map((counter, i) => (
            <ScrollReveal key={counter.key} delay={i * 0.1}>
              <div className="text-center">
                <motion.div
                  whileInView={{ scale: [0.8, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--color-accent)]">
                    <CountUp
                      end={t(`counters.${counter.key}.value`, { returnObjects: false }) * 1 || 0}
                      prefix={counter.prefix || ''}
                      suffix={counter.suffix || ''}
                    />
                  </div>
                  <p className="mt-2 font-body text-sm md:text-base text-white/90 font-medium">
                    {t(`counters.${counter.key}.label`)}
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
