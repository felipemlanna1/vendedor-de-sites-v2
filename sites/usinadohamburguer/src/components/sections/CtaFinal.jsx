import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import { delivery } from '../../data/content'
import { ShoppingBag } from 'lucide-react'

export default function CtaFinal() {
  const { t } = useTranslation()

  const channels = [
    { key: 'ifood', ...delivery.ifood },
    { key: 'rappi', ...delivery.rappi },
    { key: 'anotaai', ...delivery.anotaai },
    { key: 'whatsapp', ...delivery.whatsapp },
  ]

  return (
    <section
      id="cta-final"
      className="relative px-5 py-20 md:px-8 md:py-28 lg:px-16 lg:py-32 overflow-hidden noise-overlay"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="mx-auto max-w-[var(--max-width)] relative z-10 text-center">
        <ScrollReveal>
          <ShoppingBag
            size={48}
            className="mx-auto mb-6"
            style={{ color: '#D4A017' }}
          />
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl mx-auto"
            style={{ color: '#FAFAF5', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
          >
            {t('ctaFinal.title')}
          </h2>
          <p
            className="text-base md:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
          >
            {t('ctaFinal.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {channels.map((ch) => (
              <a
                key={ch.key}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold min-h-[48px] transition-transform hover:scale-105"
                style={{ backgroundColor: ch.color, color: '#FFFFFF' }}
              >
                {t(`deliveryBar.${ch.key}`)}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
