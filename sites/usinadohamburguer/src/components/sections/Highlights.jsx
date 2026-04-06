import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import AnimatedText from '../ui/AnimatedText'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { menuHighlights, deliveryLinks } from '../../data/content'

export default function Highlights() {
  const { t } = useTranslation()

  return (
    <Section id="destaques" background="bg-[var(--color-surface)]">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <AnimatedText
          text={t('highlights.title')}
          tag="h2"
          className="font-[var(--font-display)] text-3xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-primary)] mb-4"
        />
        <ScrollReveal>
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
            {t('highlights.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuHighlights.map((item, i) => (
          <ScrollReveal key={item.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-[var(--color-background)] rounded-xl overflow-hidden shadow-[var(--shadow-card)] group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-[var(--font-display)] font-bold text-lg text-[var(--color-text-primary)]">
                    {item.name}
                  </h3>
                  <span className="text-[var(--color-accent)] font-bold text-lg whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <a
                  href={deliveryLinks.ifood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:brightness-110 transition-all min-h-[44px]"
                >
                  {t('highlights.cta')}
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-12">
        <Link to="/cardapio">
          <Button variant="dark" className="text-base">
            {t('hero.cta_menu')}
          </Button>
        </Link>
      </ScrollReveal>
    </Section>
  )
}
