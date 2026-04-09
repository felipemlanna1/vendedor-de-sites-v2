import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { services, doctorData } from '../../data/content'
import { Stethoscope, Syringe, Droplets, Target, Bone, Scissors } from 'lucide-react'

const iconMap = {
  Stethoscope,
  Syringe,
  Droplets,
  Target,
  Bone,
  Scissors,
}

function ServiceCard({ service, index }) {
  const { t } = useTranslation()
  const Icon = iconMap[service.icon]
  const name = t(`servicos.items.${service.id}.nome`)
  const desc = t(`servicos.items.${service.id}.descricao`)

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className={`group relative bg-white rounded-2xl p-6 md:p-8 border border-surface shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
          index === 0 || index === 3 ? 'md:col-span-2' : ''
        }`}
      >
        {/* Ultrasound scan effect for applicable services */}
        {service.ultrasoundScan && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-ultrasound-scan" />
          </div>
        )}

        <div className="relative z-10">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          </div>

          <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary mb-3">
            {name}
          </h3>

          <p className="text-text-secondary leading-relaxed text-sm md:text-base">
            {desc}
          </p>

          {service.ultrasoundScan && (
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-full">
              <Target className="w-3.5 h-3.5" />
              {t('tecnologia.subtitle')}
            </span>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Servicos() {
  const { t } = useTranslation()

  return (
    <Section id="servicos">
      <div className="text-center mb-12 md:mb-16">
        <ScrollReveal>
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            {t('servicos.sectionLabel')}
          </span>
        </ScrollReveal>

        <AnimatedText
          text={t('servicos.title')}
          tag="h2"
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-4 mb-4"
        />

        <ScrollReveal delay={0.15}>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('servicos.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      <ScrollReveal delay={0.3} className="text-center mt-10 md:mt-14">
        <Button href={doctorData.whatsappUrl} variant="primary">
          {t('servicos.cta')}
        </Button>
      </ScrollReveal>
    </Section>
  )
}
