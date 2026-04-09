import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import { ratings } from '../../data/content'
import { Star } from 'lucide-react'

function RatingBadge({ score, label, reviews }) {
  return (
    <div
      className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.floor(score) ? '#D4A017' : 'transparent'}
            style={{ color: '#D4A017' }}
          />
        ))}
      </div>
      <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
        {score}
      </span>
      <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      {reviews && (
        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {reviews.toLocaleString('pt-BR')} reviews
        </span>
      )}
    </div>
  )
}

export default function SocialProof() {
  const { t } = useTranslation()

  const testimonials = [
    t('socialProof.testimonials.t1', { returnObjects: true }),
    t('socialProof.testimonials.t2', { returnObjects: true }),
    t('socialProof.testimonials.t3', { returnObjects: true }),
  ]

  return (
    <Section id="social-proof" background="bg-[var(--color-background)]">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {t('socialProof.title')}
        </h2>
        <p
          className="text-center text-sm md:text-base mb-4"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('socialProof.totalReviews')}
        </p>
        <p
          className="text-center text-sm font-semibold mb-10"
          style={{ color: '#6B4F0A' }}
        >
          {t('socialProof.ranking')}
        </p>
      </ScrollReveal>

      {/* Rating badges */}
      <ScrollReveal>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <RatingBadge score={ratings.ifood.score} label={t('socialProof.ifoodLabel')} reviews={ratings.ifood.reviews} />
          <RatingBadge score={ratings.tripadvisor.score} label={t('socialProof.tripadvisorLabel')} reviews={ratings.tripadvisor.reviews} />
          <RatingBadge score={ratings.menuweb.score} label="MenuWeb" reviews={ratings.menuweb.reviews} />
        </div>
      </ScrollReveal>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <motion.blockquote
              className="p-6 rounded-2xl h-full flex flex-col"
              style={{ backgroundColor: 'var(--color-surface)' }}
              whileHover={{ y: -2 }}
            >
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#D4A017" style={{ color: '#D4A017' }} />
                ))}
              </div>
              <p
                className="text-sm leading-relaxed flex-1 mb-4 italic"
                style={{ color: 'var(--color-text-primary)' }}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <footer className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                  {testimonial.author}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {testimonial.date}
                </span>
              </footer>
            </motion.blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
