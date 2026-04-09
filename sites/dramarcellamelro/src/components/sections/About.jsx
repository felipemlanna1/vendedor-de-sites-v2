import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import ParallaxImage from '../ui/ParallaxImage'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about" background="bg-[var(--color-background)]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <ScrollReveal direction="left" className="order-2 lg:order-1">
          <div className="relative overflow-hidden lg:overflow-visible">
            <ParallaxImage
              src="/images/profile-marcella.jpg"
              alt="Dra. Marcella Melro, cirurgiã-dentista integrativa"
              speed={0.15}
              className="aspect-[3/4] w-full rounded-2xl object-top"
            />
            {/* Accent frame — hidden on mobile to prevent overflow */}
            <div className="absolute -right-4 -bottom-4 -z-10 hidden h-full w-full rounded-2xl border-2 border-[var(--color-secondary)]/30 lg:block" />
          </div>
        </ScrollReveal>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <span className="mb-3 inline-block font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
              {t('about.title')}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mb-6 font-[var(--font-display)] text-3xl font-medium leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl">
              {t('about.subtitle')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mb-6 max-w-[60ch] font-[var(--font-body)] text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              {t('about.description')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <blockquote className="mb-6 border-l-4 border-[var(--color-accent)] pl-5">
              <p className="font-[var(--font-display)] text-lg italic leading-relaxed text-[var(--color-text-primary)] md:text-xl">
                {t('about.quote')}
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex items-center gap-4">
              <img
                src="/images/profile-marcella.jpg"
                alt="Dra. Marcella Melro, retrato profissional"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="font-[var(--font-body)] text-sm font-medium text-[var(--color-text-primary)]">
                  {t('about.subtitle')}
                </p>
                <p className="font-[var(--font-body)] text-sm text-[var(--color-text-muted)]">
                  {t('about.credentials')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
