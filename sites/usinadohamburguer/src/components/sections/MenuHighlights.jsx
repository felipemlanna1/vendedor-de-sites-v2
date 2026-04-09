import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import { menuItems } from '../../data/content'

const featured = menuItems.filter(item =>
  ['ultra-smash', 'classico', 'vegano', 'australiano', 'smash', 'vegetariano'].includes(item.id)
)

export default function MenuHighlights() {
  const { t } = useTranslation()

  return (
    <Section id="menu-highlights" background="bg-[var(--color-background)]">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {t('menuHighlights.title')}
        </h2>
        <p className="text-base md:text-lg mb-10 max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
          {t('menuHighlights.subtitle')}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.1}>
            <motion.div
              className="group relative rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {item.image && (
                <div className="overflow-hidden max-h-[280px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-lg font-bold whitespace-nowrap"
                    style={{ color: '#6B4F0A' }}
                  >
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.description}
                </p>
                {item.badges.length > 0 && (
                  <div className="flex gap-2">
                    {item.badges.map(badge => (
                      <span
                        key={badge}
                        className="text-sm font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: badge === 'vegan' ? '#004D1C' : badge === 'vegetarian' ? '#1F5C2B' : badge === 'petFriendly' ? '#7A5A0D' : '#7A5A0D',
                          color: '#FFFFFF',
                        }}
                      >
                        {t(`menuHighlights.badges.${badge}`)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-10 text-center">
          <Link
            to="/cardapio"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold min-h-[48px] transition-transform hover:scale-105"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)' }}
          >
            {t('menuHighlights.viewAll')}
          </Link>
        </div>
      </ScrollReveal>
    </Section>
  )
}
