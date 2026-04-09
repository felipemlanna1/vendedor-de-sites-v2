import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import ScrollReveal from '../ui/ScrollReveal'
import Section from '../layout/Section'

const credentialItems = [
  { key: 'unesp', color: 'var(--color-primary)', abbreviation: 'UNESP' },
  { key: 'furb', color: 'var(--color-secondary)', abbreviation: 'FURB' },
  { key: 'invisalign', color: 'var(--color-accent)', abbreviation: 'INV' },
]

export default function Credentials() {
  const { t } = useTranslation()

  return (
    <Section background="bg-[var(--color-surface)]" className="py-16 md:py-20">
      <ScrollReveal>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-10 md:mb-14" style={{ fontFamily: 'var(--font-display)' }}>
          {t('credentials.title')}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
        {credentialItems.map((cred, i) => (
          <ScrollReveal key={cred.key} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-[var(--color-background)] hover:shadow-[var(--shadow-md)] transition-shadow"
            >
              {/* Badge circle with abbreviation */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-white text-xl font-bold"
                style={{ background: cred.color, fontFamily: 'var(--font-display)' }}
              >
                {cred.abbreviation}
              </div>
              <p className="text-base md:text-lg font-semibold text-[var(--color-text-primary)]">
                {t(`credentials.${cred.key}`)}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
