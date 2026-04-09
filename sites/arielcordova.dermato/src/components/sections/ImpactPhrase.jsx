import { useTranslation } from 'react-i18next'
import AnimatedText from '../ui/AnimatedText'

export default function ImpactPhrase() {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-24 md:py-32 lg:py-40 bg-[var(--color-background)] overflow-hidden">
      <div className="mx-auto max-w-[var(--max-width)] text-center">
        <AnimatedText
          text={t('impact.phrase')}
          tag="h2"
          className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-primary-dark)] leading-none"
        />
        <div className="mt-8 mx-auto w-16 h-px bg-[var(--color-accent)]" />
      </div>
    </section>
  )
}
