import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { locations, doctorData } from '../../data/content'
import { MapPin, Building2, Navigation } from 'lucide-react'

function LocationCard({ location, direction, delay }) {
  const { t } = useTranslation()
  const data = t(`locais.${location.id}`, { returnObjects: true })

  return (
    <ScrollReveal direction={direction} delay={delay}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 md:p-8 border border-surface shadow-sm hover:shadow-xl transition-shadow"
      >
        {/* Location pin with pulse */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary">
              {data.nome}
            </h3>
            <span className="text-sm text-primary font-medium flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {data.tipo}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Navigation className="w-4 h-4 text-text-muted mt-1 shrink-0" />
            <div>
              <p className="text-text-primary font-medium">{data.endereco}</p>
              <p className="text-sm text-text-secondary">{data.cidade}</p>
            </div>
          </div>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${location.address.street}, ${location.address.city}, ${location.address.state}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-dark transition-colors py-2 min-h-[44px]"
        >
          <MapPin className="w-4 h-4" />
          Ver no Google Maps
        </a>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Locais() {
  const { t } = useTranslation()

  return (
    <Section id="locais" background="bg-surface">
      <div className="text-center mb-12 md:mb-16">
        <ScrollReveal>
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            {t('locais.sectionLabel')}
          </span>
        </ScrollReveal>

        <AnimatedText
          text={t('locais.title')}
          tag="h2"
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-4 mb-4"
        />

        <ScrollReveal delay={0.15}>
          <p className="text-text-secondary text-lg">
            {t('locais.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {locations.map((loc, i) => (
          <LocationCard
            key={loc.id}
            location={loc}
            direction={i === 0 ? 'left' : 'right'}
            delay={i * 0.15}
          />
        ))}
      </div>

      <ScrollReveal delay={0.3} className="text-center mt-10 md:mt-14">
        <Button href={doctorData.whatsappUrl} variant="primary">
          {t('locais.cta')}
        </Button>
      </ScrollReveal>
    </Section>
  )
}
