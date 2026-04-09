import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import CountUp from '../ui/CountUp'
import { siteData } from '../../data/content'

export default function Counters() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-20 bg-[var(--color-surface)]">
      <div className="mx-auto max-w-[var(--max-width)] px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {siteData.counters.map((counter, i) => (
            <motion.div
              key={counter.labelKey}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                <CountUp end={counter.end} suffix={counter.suffix} duration={2.5} />
              </div>
              <p className="mt-2 text-base md:text-lg text-[var(--color-text-secondary)] font-medium">
                {t(counter.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
