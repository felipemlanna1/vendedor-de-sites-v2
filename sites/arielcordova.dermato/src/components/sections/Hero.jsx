import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center bg-[var(--color-background)] overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 w-full py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content - left */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-medium tracking-widest uppercase text-[var(--color-primary)] mb-4"
            >
              {t('hero.crm')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-none mb-3"
            >
              {t('hero.greeting')}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <span className="font-[var(--font-display)] text-xl md:text-2xl font-light text-[var(--color-primary)]">
                {t('hero.title')}
              </span>
              <span className="block text-base md:text-lg text-[var(--color-text-secondary)] mt-1">
                {t('hero.subtitle')}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch] mb-8"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                href={`https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent('Ol\u00e1, gostaria de agendar uma consulta.')}`}
                variant="primary"
              >
                {t('hero.cta')}
              </Button>
              <Button href="#about" variant="secondary">
                {t('hero.cta_secondary')}
              </Button>
            </motion.div>
          </div>

          {/* Portrait - right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px]">
              <div className="absolute inset-0 rounded-full bg-[var(--color-primary-light)]/20" />
              <img
                src={siteData.images.portraitInstagram}
                alt="Dra. Ariel C&#243;rdova Rosa - Dermatologista"
                className="w-full h-full rounded-full object-cover aspect-square relative z-10 shadow-[var(--shadow-lg)]"
                fetchpriority="high"
                width={440}
                height={440}
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 md:w-28 md:h-28 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-accent)] flex items-center justify-center z-20 shadow-[var(--shadow-lg)]">
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-bold font-[var(--font-display)] text-[var(--color-secondary)]">5.0</span>
                  <span className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">Doctoralia</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
    </section>
  )
}
