import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Section from '../layout/Section'

const CREDENTIAL_KEYS = ['ufop', 'ufv', 'cau', 'docente', 'mei']

function MarqueeRow({ keys, direction = 'left' }) {
  const { t } = useTranslation()

  const items = keys.map((key) => (
    <div
      key={key}
      className="flex-shrink-0 flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border border-[var(--color-primary-light)]/20 mr-4"
    >
      <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
      <span className="text-sm md:text-base font-medium text-[var(--color-text-primary)] whitespace-nowrap">
        {t(`credentials.items.${key}`)}
      </span>
    </div>
  ))

  return (
    <div className="overflow-hidden ml-4 md:ml-0" style={{ maskImage: 'linear-gradient(90deg, transparent, black 20px, black calc(100% - 20px), transparent)' }}>
      <div
        className={`flex ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {items}
        {items}
        {items}
      </div>
    </div>
  )
}

export default function Credentials() {
  const { t } = useTranslation()

  return (
    <Section id="credenciais" background="bg-[var(--color-surface)]">
      <ScrollReveal>
        <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-text)] mb-4">
          {t('credentials.label')}
        </span>
      </ScrollReveal>

      <AnimatedText
        text={t('credentials.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight max-w-2xl mb-12 md:mb-16"
      />

      <div className="flex flex-col gap-4">
        <MarqueeRow keys={CREDENTIAL_KEYS} direction="left" />
        <MarqueeRow keys={[...CREDENTIAL_KEYS].reverse()} direction="right" />
      </div>
    </Section>
  )
}
