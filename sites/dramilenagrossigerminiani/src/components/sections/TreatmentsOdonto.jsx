import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData, whatsappLinks } from '../../data/content'
import { Smile, Baby, Layers, Star, Sun, Heart, Shield, Search } from 'lucide-react'

const ICONS = { Smile, Baby, Layers, Star, Sun, Heart, Shield, Search }

export default function TreatmentsOdonto() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(null)

  return (
    <Section id="resultados" background="bg-white">
      <ScrollReveal>
        <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
          {t('treatmentsOdonto.sectionLabel')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('treatmentsOdonto.title')}
        tag="h2"
        className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-4"
      />

      <ScrollReveal delay={0.2}>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-12">
          {t('treatmentsOdonto.subtitle')}
        </p>
      </ScrollReveal>

      {/* Invisalign feature */}
      <ScrollReveal delay={0.15}>
        <div className="mb-10 grid md:grid-cols-[1fr_1.5fr] gap-6 items-center bg-[var(--color-background)] rounded-2xl p-6 md:p-8">
          <div className="rounded-xl overflow-hidden aspect-square">
            <img
              src={siteData.images.treatmentInvisalign}
              alt="Alinhador Invisalign — ortodontia invisivel da Dra. Milena"
              className="w-full h-full object-cover"
              loading="eager"
              width="640"
              height="640"
            />
          </div>
          <div>
            <h3 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-text-primary)] mb-3">
              {t('treatmentsOdonto.items.invisalign.name')}
            </h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {t('treatmentsOdonto.items.invisalign.description')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Treatment cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {siteData.treatmentsOdonto
          .filter((tr) => tr.key !== 'invisalign')
          .map((treatment, i) => {
            const Icon = ICONS[treatment.icon] || Smile
            const isExpanded = expanded === treatment.key
            const name = t(`treatmentsOdonto.items.${treatment.key}.name`)
            const desc = t(`treatmentsOdonto.items.${treatment.key}.description`)

            return (
              <ScrollReveal key={treatment.key} delay={i * 0.08}>
                <motion.div
                  layout
                  onClick={() => setExpanded(isExpanded ? null : treatment.key)}
                  className={`cursor-pointer rounded-xl p-5 transition-all ${
                    isExpanded
                      ? 'bg-[var(--color-background)] shadow-md'
                      : 'bg-[var(--color-background)]/50 hover:bg-[var(--color-background)] hover:shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-text-primary)] mb-1">
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
                </motion.div>
              </ScrollReveal>
            )
          })}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.5}>
        <div className="mt-12 text-center">
          <Button href={whatsappLinks.odonto} variant="secondary">
            {t('treatmentsOdonto.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
