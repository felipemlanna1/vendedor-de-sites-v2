import { useTranslation } from 'react-i18next'
import AnimatedText from '../ui/AnimatedText'

export default function Statement() {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-24 md:py-32 lg:py-40 bg-[var(--color-surface)]">
      <div className="mx-auto max-w-[900px] text-center">
        <AnimatedText
          text={t('statement.text')}
          tag="blockquote"
          className="font-[var(--font-display)] text-2xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.2] tracking-tight italic"
        />
        <div className="mt-8 mx-auto w-16 h-[1px] bg-[var(--color-primary)]" />
      </div>
    </section>
  )
}
