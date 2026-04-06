import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import AnimatedText from '../ui/AnimatedText'
import ScrollReveal from '../ui/ScrollReveal'

const platforms = [
  { key: 'ifood_label', rating: '4.9', count: '597', color: '#C4171F' },
  { key: 'tripadvisor_label', rating: '4.6', count: '291', color: '#0F7B4F' },
  { key: 'foursquare_label', rating: '8.5', count: '', color: '#C4342D' },
]

export default function Reviews() {
  const { t } = useTranslation()

  const testimonials = ['t1', 't2', 't3'].map((key) => ({
    text: t(`reviews.items.${key}.text`),
    author: t(`reviews.items.${key}.author`),
    platform: t(`reviews.items.${key}.platform`),
  }))

  return (
    <Section id="avaliacoes" background="bg-[var(--color-background)]">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <AnimatedText
          text={t('reviews.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-primary)] mb-4"
        />
        <ScrollReveal>
          <p className="text-[var(--color-text-secondary)] text-lg">
            {t('reviews.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {platforms.map((p) => (
            <div
              key={p.key}
              className="bg-[var(--color-surface)] rounded-xl px-8 py-5 text-center min-w-[140px]"
            >
              <span
                className="font-[var(--font-display)] text-3xl md:text-4xl font-bold block"
                style={{ color: p.color }}
              >
                {p.rating}
              </span>
              <span className="text-[var(--color-text-muted)] text-sm block mt-1">
                {t(`reviews.${p.key}`)}
              </span>
              {p.count && (
                <span className="text-[var(--color-text-muted)] text-xs block">
                  {p.count} reviews
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="text-center text-[var(--color-text-primary)] font-[var(--font-display)] font-bold text-lg mb-10">
          {t('reviews.ranking')}
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((review, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <motion.blockquote
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-[var(--color-surface)] rounded-xl p-6 h-full flex flex-col"
            >
              <div className="text-[var(--color-primary)] text-4xl font-serif leading-none mb-3">&ldquo;</div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed flex-1">
                {review.text}
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--color-text-muted)]/20">
                <span className="font-semibold text-[var(--color-text-primary)] text-sm">
                  {review.author}
                </span>
                <span className="text-[var(--color-text-muted)] text-sm ml-2">
                  via {review.platform}
                </span>
              </div>
            </motion.blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
