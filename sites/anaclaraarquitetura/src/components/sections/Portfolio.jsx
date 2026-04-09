import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import Section from '../layout/Section'
import { siteData } from '../../data/content'

const CATEGORIES = ['all', 'residencial', 'interiores', 'comercial']

function PortfolioItem({ item, index }) {
  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        className="group relative overflow-hidden bg-[var(--color-surface)] cursor-pointer"
        style={{ aspectRatio: item.ratio || '3/2' }}
      >
        <img
          src={item.src}
          alt={item.alt}
          width={600}
          height={400}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Caption bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-secondary)]/90 backdrop-blur-sm px-5 py-4">
          <span className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-accent-on-dark)]">
            {item.category}
          </span>
          <p className="mt-0.5 font-display text-base text-[var(--color-background)] font-medium">
            {item.alt}
          </p>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Portfolio() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredImages = activeFilter === 'all'
    ? siteData.portfolioImages
    : siteData.portfolioImages.filter(
        (img) => img.category.toLowerCase() === activeFilter.toLowerCase()
      )

  return (
    <Section id="portfolio" background="bg-[var(--color-background)]">
      <ScrollReveal>
        <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-[var(--color-accent-text)] mb-4">
          {t('portfolio.label')}
        </span>
      </ScrollReveal>

      <AnimatedText
        text={t('portfolio.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight"
      />

      {/* Filter tabs */}
      <ScrollReveal delay={0.1} className="mt-8 md:mt-12">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all min-h-[44px] ${
                activeFilter === cat
                  ? 'bg-[var(--color-secondary)] text-[var(--color-background)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {t(`portfolio.categories.${cat === 'all' ? 'all' : cat.toLowerCase()}`)}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Grid */}
      <div className="mt-8 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredImages.map((item, i) => (
          <PortfolioItem key={item.src} item={item} index={i} />
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.2} className="mt-12 text-center">
        <Button href={siteData.whatsappLink}>
          {t('portfolio.cta')}
        </Button>
      </ScrollReveal>
    </Section>
  )
}
