import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import CountUp from '../ui/CountUp'
import ScrollReveal from '../ui/ScrollReveal'
import { impactNumbers } from '../../data/content'
import { Heart, Calendar, MapPin, Users } from 'lucide-react'

export default function ImpactCounter() {
  const { t } = useTranslation()

  const stats = [
    {
      icon: Heart,
      end: impactNumbers.donated,
      prefix: 'R$ ',
      suffix: '+',
      label: t('impact.donated'),
    },
    {
      icon: Calendar,
      end: impactNumbers.years,
      prefix: '',
      suffix: '',
      label: t('impact.years'),
    },
    {
      icon: MapPin,
      end: impactNumbers.units,
      prefix: '',
      suffix: '',
      label: t('impact.units'),
    },
    {
      icon: Users,
      end: impactNumbers.followers,
      prefix: '',
      suffix: '+',
      label: t('impact.followers'),
    },
  ]

  return (
    <Section id="impact" background="bg-[var(--color-accent)]">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4"
          style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
        >
          {t('impact.title')}
        </h2>
        <p
          className="text-center text-base md:text-lg max-w-2xl mx-auto mb-12"
          style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
        >
          {t('impact.description')}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: '#D4A017' }}
                >
                  <Icon size={24} style={{ color: '#1A1A1A' }} />
                </div>
                <span
                  className="text-3xl md:text-4xl font-bold tabular-nums"
                  style={{ color: '#FAFAF5', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
                >
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                    style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
                  />
                </span>
                <span
                  className="text-sm leading-snug max-w-[160px]"
                  style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
                >
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}
