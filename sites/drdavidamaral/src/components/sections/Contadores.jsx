import { useTranslation } from 'react-i18next'
import CountUp from '../ui/CountUp'
import ScrollReveal from '../ui/ScrollReveal'
import { counters } from '../../data/content'

export default function Contadores() {
  const { t } = useTranslation()

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {counters.map((counter, i) => (
            <ScrollReveal key={counter.key} delay={i * 0.15} className="text-center">
              <div className="flex flex-col items-center">
                <CountUp
                  end={counter.end}
                  suffix={counter.suffix}
                  className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
                />
                <p className="mt-2 text-sm md:text-base text-text-secondary font-medium">
                  {t(`contadores.${counter.key}.label`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
