import { useTranslation } from 'react-i18next'
import { delivery } from '../../data/content'
import { ShoppingBag } from 'lucide-react'

export default function DeliveryBar() {
  const { t } = useTranslation()
  const channels = [
    { key: 'ifood', ...delivery.ifood },
    { key: 'rappi', ...delivery.rappi },
    { key: 'anotaai', ...delivery.anotaai },
    { key: 'whatsapp', ...delivery.whatsapp },
  ]

  return (
    <div
      className="w-full z-30 overflow-hidden"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="mx-auto max-w-[var(--max-width)] flex items-center justify-center gap-2 px-4 py-2 md:gap-4 flex-wrap">
        <span
          className="hidden md:flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap shrink-0"
          style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}
        >
          <ShoppingBag size={14} />
          {t('deliveryBar.label')}
        </span>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
          {channels.map((ch) => (
            <a
              key={ch.key}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap min-h-[44px] transition-opacity hover:opacity-90"
              style={{ backgroundColor: ch.color, color: '#FFFFFF' }}
            >
              {t(`deliveryBar.${ch.key}`)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
