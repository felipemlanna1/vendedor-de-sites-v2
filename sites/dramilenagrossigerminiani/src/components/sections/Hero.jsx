import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Monogram from '../ui/Monogram'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { whatsappLinks } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[var(--color-background)] overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[50vw] h-[60vh] bg-gradient-to-l from-[var(--color-secondary)]/20 to-transparent rounded-l-full" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-gradient-to-tr from-[var(--color-primary)]/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[var(--max-width)] w-full px-5 md:px-8 lg:px-12 py-32 md:py-0">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Left: Text content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)] font-medium mb-4"
            >
              {t('hero.credentials')}
            </motion.p>

            {/* Title */}
            <AnimatedText
              text={t('hero.title')}
              tag="h1"
              delay={1.0}
              className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-6"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-lg mb-4"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Specialties badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-sm text-[var(--color-primary)] font-medium tracking-wide mb-8"
            >
              {t('hero.specialties')}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              <Button href={whatsappLinks.hero}>
                {t('hero.cta')}
              </Button>
            </motion.div>
          </div>

          {/* Right: Photo + Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:flex flex-col items-center"
          >
            {/* Monogram above photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <Monogram size={140} animate={true} />
            </motion.div>

            {/* Profile photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md w-full aspect-square">
              <img
                src="/images/dra-milena-perfil.jpg"
                alt="Dra. Milena Grossi Germiniani — Especialista em Harmonização Orofacial e Ortodontia"
                className="w-full h-full object-cover"
                loading="eager"
                width="1080"
                height="1080"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)]/5 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 }}
              className="absolute bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg"
            >
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Especialista</p>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">HOF + Ortodontia</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-primary)] to-transparent"
        />
      </motion.div>
    </section>
  )
}
