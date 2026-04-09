import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import CountUp from '../ui/CountUp'
import { siteData } from '../../data/content'

export default function SocialProof() {
  const { t } = useTranslation()
  const ticker = t('social.ticker', { returnObjects: true })

  const metrics = [
    { value: siteData.metrics.followers, label: t('social.followers'), prefix: '+' },
    { value: siteData.metrics.posts, label: t('social.posts'), prefix: '' },
    { value: siteData.metrics.viralLikes, label: t('social.viral'), prefix: '+' },
  ]

  return (
    <Section id="social-proof" background="bg-[var(--marfim)]" layout="flex">
      <motion.h2
        initial={{ opacity: 0.35, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--carvao)] text-center mb-12 md:mb-16"
      >
        {t('social.title')}
      </motion.h2>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.35, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="text-center"
          >
            <CountUp
              end={metric.value}
              prefix={metric.prefix}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-[var(--terracota)] block"
            />
            <span className="text-[var(--grafite)] text-sm md:text-base mt-2 block tracking-wide">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Ticker / Marquee */}
      {Array.isArray(ticker) && ticker.length > 0 && (
        <div className="overflow-hidden border-y border-[var(--pergaminho)] py-4 max-w-full">
          <div className="flex animate-marquee whitespace-nowrap w-max">
            {[...ticker, ...ticker, ...ticker].map((phrase, i) => (
              <span
                key={i}
                className="mx-8 text-lg md:text-xl font-display text-[var(--grafite)]/50 italic"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
