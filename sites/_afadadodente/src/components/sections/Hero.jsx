import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import MagicParticles from '../ui/MagicParticles'
import FairySignature from '../ui/FairySignature'
import { business, images } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(business.whatsappMessage)}`

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)] to-[var(--color-primary-light)]/20">
      {/* Particulas magicas douradas */}
      <MagicParticles className="z-0" />

      <div className="relative z-10 mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 w-full pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16">
          {/* Text — 55% left */}
          <div className="flex-1 md:max-w-[55%] text-center md:text-left">
            {/* Badge CRO */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-body text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              {t('hero.badge')}
            </motion.div>

            <AnimatedText
              text={t('hero.title')}
              tag="h1"
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[var(--color-text-primary)]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] max-w-[55ch]"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button href={whatsappUrl} variant="primary" className="text-base">
                {t('hero.cta')}
              </Button>
            </motion.div>
          </div>

          {/* Image — 45% right with fairy signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 md:max-w-[45%] relative"
          >
            {/* Fairy flying above the photo */}
            <FairySignature
              size={120}
              className="absolute -top-14 -right-6 z-20 md:-top-16 md:-right-8"
            />
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)]">
              <img
                src={images.hero}
                alt={`${business.legalName} - ${business.tagline}`}
                className="w-full h-auto object-cover aspect-square"
                fetchpriority="high"
                width={640}
                height={640}
              />
              {/* Golden glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/15 via-transparent to-[var(--color-primary)]/5 pointer-events-none" />
            </div>
            {/* Decorative sparkles around photo */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--color-accent)]/20 rounded-full blur-sm animate-pulse" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[var(--color-secondary)]/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 -left-5 w-4 h-4 bg-[var(--color-accent)]/15 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none z-10" />
    </section>
  )
}
