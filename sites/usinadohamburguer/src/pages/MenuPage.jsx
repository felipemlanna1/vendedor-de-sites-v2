import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../components/layout/Section'
import ScrollReveal from '../components/ui/ScrollReveal'
import { fullMenu, deliveryLinks } from '../data/content'

const categories = [
  { key: 'all', i18nKey: 'filter_all' },
  { key: 'combos', i18nKey: 'filter_combos' },
  { key: 'hamburgueres', i18nKey: 'filter_burgers' },
  { key: 'smash', i18nKey: 'filter_smash' },
  { key: 'veggie', i18nKey: 'filter_veggie' },
  { key: 'porcoes', i18nKey: 'filter_sides' },
  { key: 'bebidas', i18nKey: 'filter_drinks' },
  { key: 'pet', i18nKey: 'filter_pet' },
]

export default function MenuPage() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')

  const getItems = () => {
    if (active === 'all') {
      return Object.entries(fullMenu).flatMap(([cat, items]) =>
        items.map((item) => ({ ...item, category: cat }))
      )
    }
    return (fullMenu[active] || []).map((item) => ({ ...item, category: active }))
  }

  const items = getItems()

  return (
    <>
      <div className="pt-28 pb-8 bg-[var(--color-secondary)]">
        <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16">
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold text-white tracking-tighter mb-3">
            {t('menu_page.title')}
          </h1>
          <p className="text-white/60 text-lg max-w-[50ch]">
            {t('menu_page.subtitle')}
          </p>
        </div>
      </div>

      <Section background="bg-[var(--color-background)]" className="pt-8">
        <div className="flex flex-wrap gap-2 mb-10 sticky top-16 z-30 bg-[var(--color-background)] py-4 -mx-5 px-5 md:-mx-8 md:px-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                active === cat.key
                  ? 'bg-[var(--color-primary)] text-[var(--color-secondary)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/20'
              }`}
            >
              {t(`menu_page.${cat.i18nKey}`)}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((item, i) => (
            <motion.div
              key={`${item.category}-${item.name}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="bg-[var(--color-surface)] rounded-xl p-5 flex flex-col"
            >
              {item.image && (
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-[var(--font-display)] font-bold text-[var(--color-text-primary)]">
                  {item.name}
                </h3>
                <span className="text-[var(--color-primary)] font-bold whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              {item.desc && (
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4 flex-1">
                  {item.desc}
                </p>
              )}
              <a
                href={deliveryLinks.ifood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:brightness-110 transition-all mt-auto"
              >
                {t('menu_page.order')}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  )
}
