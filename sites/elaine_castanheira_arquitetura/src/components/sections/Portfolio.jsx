import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { siteData } from '../../data/content'
import { X } from 'lucide-react'

const projectImages = [
  { src: siteData.images.hero, alt: 'Sala de jantar e living integrados - Projeto Costa Azul' },
  { src: siteData.images.living, alt: 'Living com vista para o mar - Projeto Costa Azul' },
  { src: siteData.images.kitchen, alt: 'Cozinha integrada com bancada em calacata - Projeto Costa Azul' },
  { src: siteData.images.reading, alt: 'Canto de leitura com poltrona Costela - Projeto Costa Azul' },
]

export default function Portfolio() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <Section id="projetos" background="bg-[var(--color-surface)]">
      <div className="mb-12 md:mb-16">
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary)] mb-4">
          {t('portfolio.label')}
        </p>
        <AnimatedText
          text={t('portfolio.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-3">
          <ScrollReveal>
            <button
              onClick={() => setLightboxIndex(0)}
              className="overflow-hidden rounded-lg cursor-pointer w-full aspect-[16/10] mb-3 md:mb-4 block"
            >
              <img
                src={projectImages[0].src}
                alt={projectImages[0].alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={800}
                height={500}
              />
            </button>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <ScrollReveal delay={0.1}>
              <button onClick={() => setLightboxIndex(1)} className="overflow-hidden rounded-lg cursor-pointer w-full aspect-[3/2] block">
                <img src={projectImages[1].src} alt={projectImages[1].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" width={600} height={400} />
              </button>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <button onClick={() => setLightboxIndex(2)} className="overflow-hidden rounded-lg cursor-pointer w-full aspect-[3/2] block">
                <img src={projectImages[2].src} alt={projectImages[2].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" width={600} height={400} />
              </button>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <button onClick={() => setLightboxIndex(3)} className="overflow-hidden rounded-lg cursor-pointer w-full aspect-[3/4] block">
                <img src={projectImages[3].src} alt={projectImages[3].alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" width={400} height={533} />
              </button>
            </ScrollReveal>
          </div>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-24">
          <ScrollReveal direction="right">
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-medium text-[var(--color-text-primary)] mb-2">
              {t('portfolio.project.name')}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              {t('portfolio.project.location')} &mdash; {t('portfolio.project.year')}
            </p>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
              {t('portfolio.project.description')}
            </p>

            <div className="space-y-4 border-t border-[var(--color-secondary)]/40 pt-6">
              <div>
                <p className="text-sm font-medium tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">
                  Materiais
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t('portfolio.project.materials')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-1">
                  Design
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t('portfolio.project.furniture')}
                </p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] italic pt-2">
                {t('portfolio.project.photographer')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--color-text-primary)]/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Fechar"
            >
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={projectImages[lightboxIndex].src}
              alt={projectImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
