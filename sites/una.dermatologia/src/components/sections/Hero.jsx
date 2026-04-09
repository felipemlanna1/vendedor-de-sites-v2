import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { Star } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden overflow-x-hidden bg-[var(--color-background)]"
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[var(--color-primary)]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-[var(--color-secondary)]/[0.05] to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="mx-auto max-w-[var(--max-width)] w-full px-5 md:px-8 lg:px-16 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="order-2 lg:order-1">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/[0.08] text-[var(--color-primary)] text-sm font-medium">
                <Star size={14} className="fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                {t('hero.badge_google')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/[0.08] text-[var(--color-primary)] text-sm font-medium">
                <Star size={14} className="fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                {t('hero.badge_doctoralia')}
              </span>
            </motion.div>

            {/* Headline */}
            <AnimatedText
              text={t('hero.headline')}
              tag="h1"
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)]"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch]"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button href={siteData.whatsappLink} variant="primary">
                {t('hero.cta_primary')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.cta_secondary')}
              </Button>
            </motion.div>
          </div>

          {/* Right - Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              {/* Decorative ring */}
              <div className="absolute -inset-3 md:-inset-4 rounded-full border-2 border-[var(--color-secondary)]/20" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10" />
              <img
                src="/images/portrait-dra-ariel.jpg"
                alt="Dra. Ariel Cordova Rosa - Dermatologista - UNA Dermatologia"
                width={420}
                height={420}
                fetchpriority="high"
                className="relative w-full h-full rounded-full object-cover object-top"
              />
              {/* Floating credential */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-2 left-2 md:bottom-4 md:-left-8 bg-[var(--color-surface)] rounded-2xl px-5 py-3 shadow-lg border border-[var(--color-border-light)]"
              >
                <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">CRM/SC 23372</p>
                <p className="text-base font-semibold text-[var(--color-primary)]">Dra. Ariel Cordova Rosa</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-[var(--color-text-muted)]/30 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--color-text-muted)]/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
