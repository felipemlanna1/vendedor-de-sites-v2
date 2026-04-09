import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import FairyWings from '../ui/FairyWings'

export default function Impact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <section className="relative py-20 md:py-28 bg-[var(--color-primary-light)]/20 overflow-hidden">
      {/* Varinha SVG no canto superior esquerdo */}
      <motion.svg
        viewBox="0 0 48 48"
        className="absolute top-6 left-[8%] w-10 h-10 md:w-14 md:h-14"
        animate={{ rotate: [0, 8, -4, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <line x1="12" y1="40" x2="30" y2="18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        <polygon points="30,8 32,14 38,15 33,19 34,25 30,21 26,25 27,19 22,15 28,14" fill="var(--color-accent)" />
      </motion.svg>

      {/* Sparkle 4 pontas no canto inferior direito */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute bottom-8 right-[12%] w-6 h-6 md:w-8 md:h-8"
        animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      >
        <path d="M12 0c0 0 2 8 4 10s8 2 8 2-8 2-10 4-2 8-2 8-2-8-4-10S0 12 0 12s8-2 10-4 2-8 2-8z" fill="var(--color-accent)" opacity="0.5" />
      </motion.svg>

      <div ref={ref} className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 text-center">
        <FairyWings>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-display font-semibold text-2xl md:text-4xl lg:text-5xl text-[var(--color-primary-dark)] leading-tight tracking-tight px-8 md:px-16"
          >
            {t('impact.phrase')}
          </motion.p>
        </FairyWings>
      </div>
    </section>
  )
}
