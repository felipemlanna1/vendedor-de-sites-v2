import { useTranslation } from 'react-i18next'
import Section from '../layout/Section'
import AnimatedText from '../ui/AnimatedText'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Manifesto() {
  const { t } = useTranslation()
  const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(siteData.whatsappMessage)}`

  return (
    <Section
      id="manifesto"
      background="bg-[var(--color-surface)]"
      className="text-center"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <span className="mb-6 inline-block font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
            {t('manifesto.title')}
          </span>
        </ScrollReveal>

        <AnimatedText
          text={t('manifesto.text')}
          tag="h2"
          className="mb-8 font-[var(--font-display)] text-3xl font-medium leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl"
        />

        <ScrollReveal delay={0.4}>
          <p className="mx-auto mb-10 max-w-[60ch] font-[var(--font-body)] text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            {t('manifesto.description')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <Button href={whatsappUrl} variant="secondary">
            {t('manifesto.cta')}
          </Button>
        </ScrollReveal>
      </div>
    </Section>
  )
}
