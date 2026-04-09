import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import CountUp from '../ui/CountUp'
import { siteData } from '../../data/content'

const badgeKeys = ['integrativa', 'unesp', 'abm', 'holistica']

export default function Differentials() {
  const { t } = useTranslation()

  return (
    <Section id="differentials" background="bg-[var(--color-background)]">
      <div className="mb-12 text-center md:mb-16">
        <ScrollReveal>
          <span className="mb-3 inline-block font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
            {t('differentials.title')}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mx-auto max-w-2xl font-[var(--font-display)] text-3xl font-medium leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            {t('differentials.subtitle')}
          </h2>
        </ScrollReveal>
      </div>

      {/* Congress photos */}
      <ScrollReveal delay={0.15}>
        <div className="mb-16 flex justify-center">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl">
            <img
              src="/images/post-congresso-posicionamento.jpg"
              alt="Dra. Marcella Melro no stand Philozon Ozoncare — congresso de odontologia integrativa"
              width={600}
              height={600}
              className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
              decoding="async"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Stats counters */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        {siteData.differentials.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={0.2 + i * 0.1}>
            <div className="text-center">
              <div className="mb-2 font-[var(--font-display)] text-5xl font-semibold text-[var(--color-primary-dark)] md:text-6xl">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <p className="font-[var(--font-body)] text-sm font-medium text-[var(--color-text-secondary)]">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Badges */}
      <ScrollReveal delay={0.4}>
        <div className="flex flex-wrap justify-center gap-3">
          {badgeKeys.map((key) => (
            <span
              key={key}
              className="rounded-full border border-[var(--color-secondary)] bg-[var(--color-surface)] px-5 py-2.5 font-[var(--font-body)] text-sm font-medium text-[var(--color-text-secondary)]"
            >
              {t(`differentials.badges.${key}`)}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}
