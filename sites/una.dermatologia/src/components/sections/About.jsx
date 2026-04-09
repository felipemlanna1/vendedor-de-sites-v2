import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about" background="bg-[var(--color-background)]">
      <ScrollReveal>
        <p className="text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4">
          {t('about.label')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('about.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--color-text-primary)] max-w-[20ch]"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left - Narrative */}
        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t('about.paragraph_1')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t('about.paragraph_2')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] font-medium italic">
              {t('about.paragraph_3')}
            </p>
          </ScrollReveal>
        </div>

        {/* Right - Mission/Vision/Values */}
        <div className="space-y-8">
          {['mission', 'vision', 'values'].map((item, i) => (
            <ScrollReveal key={item} delay={0.1 * (i + 1)}>
              <div className="border-l-2 border-[var(--color-secondary)] pl-6">
                <h3 className="font-display text-xl font-semibold text-[var(--color-primary)] mb-2">
                  {t(`about.${item}_title`)}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {t(`about.${item}`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
