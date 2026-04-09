import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { ShieldCheck, Leaf, GraduationCap, BookOpen } from 'lucide-react'

const credentialIcons = {
  cau: ShieldCheck,
  healthy: Leaf,
  ufsc: GraduationCap,
  contti: BookOpen,
}

const credentialKeys = ['cau', 'healthy', 'ufsc', 'contti']

export default function Credentials() {
  const { t } = useTranslation()

  return (
    <Section id="credenciais" background="bg-[var(--color-background)]">
      <div className="mb-12 md:mb-16 text-center">
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary)] mb-4">
          {t('credentials.label')}
        </p>
        <AnimatedText
          text={t('credentials.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight mx-auto max-w-3xl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {credentialKeys.map((key, i) => {
          const Icon = credentialIcons[key]
          return (
            <ScrollReveal key={key} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-center p-8 rounded-xl border border-[var(--color-secondary)]/30 hover:border-[var(--color-primary)]/30 transition-colors bg-[var(--color-surface)]/50"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-text-primary)] mb-1">
                  {t(`credentials.items.${key}.name`)}
                </h3>
                <p className="text-sm font-medium text-[var(--color-primary)] mb-3">
                  {t(`credentials.items.${key}.detail`)}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {t(`credentials.items.${key}.description`)}
                </p>
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}
