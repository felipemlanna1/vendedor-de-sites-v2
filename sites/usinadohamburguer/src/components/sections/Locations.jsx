import { useTranslation } from 'react-i18next'
import { MapPin, Clock, ArrowSquareOut } from '@phosphor-icons/react'
import Section from '../layout/Section'
import AnimatedText from '../ui/AnimatedText'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { locations } from '../../data/content'

export default function Locations() {
  const { t } = useTranslation()

  return (
    <Section id="unidades" background="bg-[var(--color-surface)]">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <AnimatedText
          text={t('locations.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-primary)] mb-4"
        />
        <ScrollReveal>
          <p className="text-[var(--color-text-secondary)] text-lg">
            {t('locations.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {locations.map((loc, i) => (
          <ScrollReveal key={loc.id} delay={i * 0.12}>
            <div className="bg-[var(--color-background)] rounded-xl p-6 h-full flex flex-col shadow-[var(--shadow-card)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <MapPin size={20} weight="fill" className="text-[var(--color-secondary)]" />
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] font-bold text-xl text-[var(--color-text-primary)]">
                    {t(`locations.units.${loc.id}.name`)}
                  </h3>
                  {t(`locations.units.${loc.id}.since`) && (
                    <span className="text-[var(--color-text-secondary)] text-sm font-medium">
                      {t(`locations.units.${loc.id}.since`)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[var(--color-text-secondary)] text-sm mb-2">
                {t(`locations.units.${loc.id}.address`)}
              </p>

              <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-6">
                <Clock size={16} />
                <span>{t('locations.hours')}</span>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                {loc.ifood && (
                  <a
                    href={loc.ifood}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full hover:brightness-110 transition-all"
                    style={{ backgroundColor: '#B4171F', color: '#FFFFFF' }}
                  >
                    iFood <ArrowSquareOut size={14} />
                  </a>
                )}
                {loc.rappi && (
                  <a
                    href={loc.rappi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full hover:brightness-110 transition-all"
                    style={{ backgroundColor: '#A12D15', color: '#FFFFFF' }}
                  >
                    Rappi <ArrowSquareOut size={14} />
                  </a>
                )}
                {loc.anotaai && (
                  <a
                    href={loc.anotaai}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full hover:brightness-110 transition-all"
                    style={{ backgroundColor: '#006025', color: '#FFFFFF' }}
                  >
                    Anota Ai <ArrowSquareOut size={14} />
                  </a>
                )}
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[var(--color-text-muted)]/30 text-[var(--color-text-secondary)] text-sm font-medium px-4 py-2 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t('locations.directions')}
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}
