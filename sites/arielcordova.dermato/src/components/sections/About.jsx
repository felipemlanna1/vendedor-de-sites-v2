import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { Stethoscope, GraduationCap, Users } from 'lucide-react'

const highlights = [
  { key: 'highlight_1', icon: Stethoscope },
  { key: 'highlight_2', icon: GraduationCap },
  { key: 'highlight_3', icon: Users },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about" background="bg-[var(--color-surface)]">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <div className="lg:col-span-2">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)] mb-6">
              {t('about.label')}
            </p>
          </ScrollReveal>
          <AnimatedText
            text={t('about.title')}
            tag="h2"
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight mb-10"
          />
          <div className="space-y-4">
            {highlights.map(({ key, icon: Icon }, i) => (
              <ScrollReveal key={key} delay={i * 0.15}>
                <div className="flex items-start gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background)] hover:shadow-[var(--shadow-sm)] transition-shadow">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[var(--color-secondary)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">
                    {t(`about.${key}`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <ScrollReveal>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.description')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.text_2')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('about.text_3')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="pt-6 border-t border-[var(--color-primary-light)]/30">
              <p className="text-sm text-[var(--color-text-secondary)] italic">
                &ldquo;{t('impact.phrase')}&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}
