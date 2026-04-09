import { useTranslation } from 'react-i18next'
import AnimatedText from '../ui/AnimatedText'

export default function Quote({ i18nKey = 'quote1' }) {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-20 md:py-28 lg:py-32 md:px-8 lg:px-16 bg-[var(--color-background-alt)]">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedText
          text={t(`${i18nKey}.text`)}
          tag="blockquote"
          className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium italic text-[var(--color-text-primary)] leading-snug"
        />
      </div>
    </section>
  )
}
