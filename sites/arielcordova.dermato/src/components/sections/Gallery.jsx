import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { siteData } from '../../data/content'

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <Section id="gallery" background="bg-[var(--color-surface)]">
      <div className="text-center mb-12">
        <ScrollReveal>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-4">
            {t('gallery.label')}
          </p>
        </ScrollReveal>
        <AnimatedText
          text={t('gallery.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-primary-light)]/10 aspect-square"
          >
            <img
              src={siteData.images.portraitInstagram}
              alt="Dra. Ariel C&#243;rdova Rosa - Dermatologista em Florian&#243;polis"
              className="w-full h-full object-cover"
              loading="lazy"
              width={600}
              height={600}
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-[var(--radius-xl)] overflow-hidden aspect-square bg-gradient-to-br from-[var(--color-primary-light)]/20 to-[var(--color-accent)]/10 flex flex-col items-center justify-center p-8"
          >
            <p className="font-[var(--font-display)] text-5xl md:text-7xl font-bold text-[var(--color-primary)]/15 mb-4">UFSC</p>
            <p className="font-[var(--font-display)] text-lg md:text-xl font-medium text-[var(--color-text-primary)] text-center mb-2">Pesquisadora e Preceptora</p>
            <p className="text-sm text-[var(--color-text-secondary)] text-center max-w-[30ch]">Hospital Universit&#225;rio da UFSC</p>
            <div className="w-12 h-px bg-[var(--color-accent)] my-4" />
            <p className="text-sm text-[var(--color-text-muted)] text-center">EADV Paris | SBD/SC | CBD</p>
          </motion.div>
        </ScrollReveal>
      </div>
    </Section>
  )
}
