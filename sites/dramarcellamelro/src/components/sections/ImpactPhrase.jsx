import { useTranslation } from 'react-i18next'
import AnimatedText from '../ui/AnimatedText'

export default function ImpactPhrase() {
  const { t } = useTranslation()

  return (
    <section className="bg-[var(--color-primary-dark)] px-5 py-24 md:px-8 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <AnimatedText
          text={t('impact.phrase')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl font-medium italic leading-tight tracking-tight text-[var(--color-background)] md:text-5xl lg:text-6xl"
        />
      </div>
    </section>
  )
}
