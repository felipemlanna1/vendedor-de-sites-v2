import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData, whatsappLinks } from '../../data/content'
import { Sparkles, Heart, Droplets, Zap, Radio, Leaf, Dna, Scissors } from 'lucide-react'

const ICONS = { Sparkles, Heart, Droplets, Zap, Radio, Leaf, Dna, Scissors }

export default function TreatmentsHof() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(null)

  return (
    <Section id="tratamentos-hof" background="bg-[var(--color-secondary)]/20">
      <ScrollReveal>
        <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
          {t('treatmentsHof.sectionLabel')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('treatmentsHof.title')}
        tag="h2"
        className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-4"
      />

      <ScrollReveal delay={0.2}>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-12">
          {t('treatmentsHof.subtitle')}
        </p>
      </ScrollReveal>

      {/* Treatment cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {siteData.treatmentsHof.map((treatment, i) => {
          const Icon = ICONS[treatment.icon] || Sparkles
          const isExpanded = expanded === treatment.key
          const name = t(`treatmentsHof.items.${treatment.key}.name`)
          const desc = t(`treatmentsHof.items.${treatment.key}.description`)

          return (
            <ScrollReveal key={treatment.key} delay={i * 0.08}>
              <motion.div
                layout
                onClick={() => setExpanded(isExpanded ? null : treatment.key)}
                className={`relative group cursor-pointer rounded-xl p-6 transition-shadow ${
                  isExpanded
                    ? 'bg-white shadow-lg'
                    : 'bg-white/60 hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Decorative background image on hover */}
                {treatment.image && (
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity"
                    aria-hidden="true"
                    style={{ backgroundImage: `url(${treatment.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  />
                )}

                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Icon size={20} className="text-[var(--color-primary)]" />
                  </div>

                  <h3 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-text-primary)] mb-2">
                    {name}
                  </h3>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-[var(--color-text-secondary)] leading-relaxed overflow-hidden"
                      >
                        {desc}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Toque para saber mais</p>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.6}>
        <div className="mt-12 text-center">
          <Button href={whatsappLinks.hof} variant="secondary">
            {t('treatmentsHof.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
