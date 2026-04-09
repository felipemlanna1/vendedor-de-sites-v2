import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { siteData } from '../../data/content'
import { Award, BadgeCheck, MapPin, Users, Dna, Flower2 } from 'lucide-react'

const ICONS = { Award, BadgeCheck, MapPin, Users, Dna, Flower2 }

export default function Differentials() {
  const { t } = useTranslation()

  return (
    <Section id="diferenciais">
      <ScrollReveal>
        <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-primary)] font-medium mb-4">
          {t('differentials.sectionLabel')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('differentials.title')}
        tag="h2"
        className="font-[var(--font-display)] text-4xl md:text-5xl font-medium text-[var(--color-text-primary)] tracking-tight mb-12"
      />

      {/* Bento grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {siteData.differentials.map((diff, i) => {
          const Icon = ICONS[diff.icon] || Award
          const isLarge = diff.size === 'large'

          return (
            <ScrollReveal
              key={diff.key}
              delay={i * 0.1}
              className={isLarge ? 'col-span-2' : ''}
            >
              <div className={`group bg-white rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow h-full ${
                isLarge ? 'flex items-start gap-5' : ''
              }`}>
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0 mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <Icon size={20} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-text-primary)] mb-2">
                    {t(`differentials.items.${diff.key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {t(`differentials.items.${diff.key}.description`)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}
