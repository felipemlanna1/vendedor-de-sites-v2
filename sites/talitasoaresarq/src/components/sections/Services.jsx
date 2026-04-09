import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Home, Building2, MessageCircle, ClipboardCheck } from 'lucide-react'
import Section from '../layout/Section'

const iconMap = {
  residential: Home,
  commercial: Building2,
  consulting: MessageCircle,
  followup: ClipboardCheck,
}

const serviceKeys = ['residential', 'commercial', 'consulting', 'followup']

export default function Services() {
  const { t } = useTranslation()

  return (
    <Section id="services" background="bg-[var(--linho)]" layout="grid">
      <motion.h2
        initial={{ opacity: 0.35, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--carvao)] text-center mb-12 md:mb-16"
      >
        {t('services.title')}
      </motion.h2>

      {/* Bento grid — first card spans 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {serviceKeys.map((key, i) => {
          const Icon = iconMap[key]
          const isMain = i === 0
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0.35, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative bg-[var(--marfim)] border border-[var(--pergaminho)] p-8 md:p-10 rounded-sm hover:border-[var(--terracota)]/40 hover:shadow-lg transition-all duration-500 ${
                isMain ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-6 font-display text-7xl text-[var(--pergaminho)]/60 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-sm bg-[var(--terracota)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--terracota)]/20 transition-colors duration-300">
                  <Icon size={24} className="text-[var(--terracota)]" strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-xl md:text-2xl text-[var(--carvao)] mb-3">
                  {t(`services.items.${key}.name`)}
                </h3>

                <p className="text-[var(--grafite)] leading-relaxed text-sm md:text-base">
                  {t(`services.items.${key}.description`)}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
