import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import Section from '../components/layout/Section'
import ScrollReveal from '../components/ui/ScrollReveal'
import { menuItems, delivery } from '../data/content'

const categories = ['all', 'burgers', 'combos', 'sides', 'drinks']

export default function Cardapio() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === active)

  return (
    <>
      <Helmet>
        <title>Cardapio | Usina do Hamburguer - Florianopolis</title>
        <meta name="description" content="Cardapio completo da Usina do Hamburguer. Hamburgueres artesanais black angus, opcoes veganas, Pet Burguer, porcoes e bebidas. Precos a partir de R$23,90." />
      </Helmet>

      {/* Hero section for page */}
      <section
        className="pt-32 pb-12 px-5 md:px-8"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        <div className="mx-auto max-w-[var(--max-width)]">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
            style={{ color: '#D4A017', fontFamily: 'var(--font-display)', backgroundColor: '#1A1A1A' }}
          >
            {t('menuPage.title')}
          </h1>
          <p className="text-base md:text-lg max-w-lg" style={{ color: '#FAFAF5', backgroundColor: '#1A1A1A' }}>
            {t('menuPage.subtitle')}
          </p>
        </div>
      </section>

      <Section id="cardapio">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold min-h-[48px] transition-colors"
              style={{
                backgroundColor: active === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                color: active === cat ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              }}
            >
              {t(`menuPage.filters.${cat}`)}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                {item.image && (
                  <div className="overflow-hidden max-h-[280px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                      {item.name}
                    </h3>
                    <span className="text-base font-bold whitespace-nowrap" style={{ color: 'var(--color-primary)' }}>
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
                  )}
                  {item.badges.length > 0 && (
                    <div className="flex gap-1.5 mt-2">
                      {item.badges.map(badge => (
                        <span
                          key={badge}
                          className="text-sm font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: badge === 'vegan' ? '#006025' : badge === 'vegetarian' ? '#2D7A3A' : badge === 'petFriendly' ? '#A67C12' : '#D4A017',
                            color: '#FFFFFF',
                          }}
                        >
                          {t(`menuHighlights.badges.${badge}`)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Floating order CTA */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {[delivery.ifood, delivery.rappi].map(ch => (
            <a
              key={ch.label}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-bold min-h-[48px] shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: ch.color, color: '#FFFFFF' }}
            >
              {t('menuPage.orderVia')} {ch.label}
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}
