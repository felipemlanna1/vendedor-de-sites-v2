import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Sparkles, Wand2, Crown, MoonStar, BadgeCheck, Star } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Section from '../layout/Section'
import { differentials } from '../../data/content'

const iconMap = {
  sparkles: Sparkles,
  wand: Wand2,
  crown: Crown,
  moonstar: MoonStar,
  badge: BadgeCheck,
  star: Star,
}

// Bento grid sizes — alternating large/small
const gridClasses = [
  'sm:col-span-2 sm:row-span-1',  // playful — wide
  'sm:col-span-1 sm:row-span-1',  // fearless
  'sm:col-span-1 sm:row-span-1',  // specialized
  'sm:col-span-1 sm:row-span-1',  // location
  'sm:col-span-1 sm:row-span-1',  // cro
  'sm:col-span-2 sm:row-span-1',  // humanized — wide
]

function DifferentialCard({ diffKey, icon, index }) {
  const { t } = useTranslation()
  const Icon = iconMap[icon] || Sparkles

  return (
    <ScrollReveal delay={index * 0.08} className={`${gridClasses[index] || ''}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group h-full bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 md:p-8 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow relative overflow-hidden"
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-light)]/20 flex items-center justify-center group-hover:bg-[var(--color-accent)]/15 transition-colors">
            <Icon className="w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-base md:text-lg text-[var(--color-text-primary)]">
              {t(`differentials.items.${diffKey}.name`)}
            </h3>
            <p className="mt-1.5 font-body text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">
              {t(`differentials.items.${diffKey}.description`)}
            </p>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Differentials() {
  const { t } = useTranslation()

  return (
    <Section id="diferenciais">
      <div className="text-center mb-12 md:mb-16">
        <AnimatedText
          text={t('differentials.title')}
          tag="h2"
          className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] tracking-tight"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {differentials.map((diff, i) => (
          <DifferentialCard
            key={diff.key}
            diffKey={diff.key}
            icon={diff.icon}
            index={i}
          />
        ))}
      </div>
    </Section>
  )
}
