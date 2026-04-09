import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../components/layout/Section'
import ScrollReveal from '../components/ui/ScrollReveal'
import { locations } from '../data/content'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

export default function Unidades() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Nossas Unidades | Usina do Hamburguer - Florianopolis e Itapema</title>
        <meta name="description" content="4 unidades da Usina do Hamburguer: Trindade, Centro e Rio Tavares em Florianopolis, e Itapema. Funcionamento diario das 17:30 a 00:00." />
      </Helmet>

      {/* Hero */}
      <section
        className="pt-32 pb-12 px-5 md:px-8"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <div className="mx-auto max-w-[var(--max-width)]">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
            style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
          >
            {t('locationsPage.title')}
          </h1>
          <p className="text-base md:text-lg max-w-lg" style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}>
            {t('locationsPage.subtitle')}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.id} delay={i * 0.1}>
              <motion.div
                className="rounded-2xl p-6 md:p-8 h-full flex flex-col"
                style={{ backgroundColor: 'var(--color-surface)' }}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <MapPin size={18} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                    >
                      {loc.name}
                    </h2>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      Desde {loc.since}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 flex-1 mb-6">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="shrink-0 mt-1" style={{ color: 'var(--color-text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {loc.address}, {loc.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {loc.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                    <a href={`tel:${loc.phone.replace(/\D/g, '')}`} className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold min-h-[48px] w-full transition-colors hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)' }}
                >
                  <Navigation size={16} />
                  {t('locationsPage.howToGet')}
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  )
}
