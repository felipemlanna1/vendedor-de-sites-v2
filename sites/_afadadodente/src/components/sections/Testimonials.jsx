import { useTranslation } from 'react-i18next'
import { Star } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { testimonials, business } from '../../data/content'

function TestimonialCard({ testKey }) {
  const { t } = useTranslation()

  return (
    <div className="shrink-0 w-[280px] md:w-[340px] bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)] mx-3">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
        ))}
      </div>

      <p className="font-body text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)] italic">
        &ldquo;{t(`testimonials.items.${testKey}.text`)}&rdquo;
      </p>

      <div className="mt-4 pt-4 border-t border-[var(--color-primary-light)]/20">
        <p className="font-display font-semibold text-sm text-[var(--color-text-primary)]">
          {t(`testimonials.items.${testKey}.author`)}
        </p>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">
          {t(`testimonials.items.${testKey}.role`)}
        </p>
      </div>
    </div>
  )
}

function Marquee({ children, direction = 'left' }) {
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex shrink-0 w-max ${animClass}`}>
        {children}
        {children}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  const firstRow = testimonials.slice(0, 3)
  const secondRow = testimonials.slice(3, 6)

  return (
    <Section id="depoimentos" background="bg-[var(--color-primary-light)]/8">
      <div className="text-center mb-12 md:mb-16">
        <AnimatedText
          text={t('testimonials.title')}
          tag="h2"
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] tracking-tight"
        />
      </div>

      {/* Marquee row 1 — left */}
      <div className="mb-6">
        <Marquee direction="left">
          {firstRow.map((key) => (
            <TestimonialCard key={key} testKey={key} />
          ))}
        </Marquee>
      </div>

      {/* Marquee row 2 — right */}
      <div>
        <Marquee direction="right">
          {secondRow.map((key) => (
            <TestimonialCard key={key} testKey={key} />
          ))}
        </Marquee>
      </div>

      <ScrollReveal delay={0.3}>
        <div className="text-center mt-12">
          <Button href={whatsappUrl} variant="primary">
            {t('testimonials.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
