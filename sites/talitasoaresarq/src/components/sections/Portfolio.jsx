import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import Section from '../layout/Section'
import CurtainReveal from '../ui/CurtainReveal'
import { siteData } from '../../data/content'

const projectLabels = [
  'Ambiente residencial',
  'Sala de estar',
  'Projeto contempor\u00e2neo',
  'Design de interiores',
  'Espa\u00e7o integrado',
  'S\u00e9rie: O \u00f3bvio',
]

export default function Portfolio() {
  const { t } = useTranslation()

  return (
    <Section id="portfolio" background="bg-[var(--carvao)]">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0.35, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--marfim)] mb-4"
        >
          {t('portfolio.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0.35 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--pergaminho)]/70 text-base md:text-lg"
        >
          {t('portfolio.subtitle')}
        </motion.p>
      </div>

      {/* Masonry grid with curtain reveal */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {siteData.images.portfolio.map((src, i) => (
          <CurtainReveal key={i} delay={i * 0.15} className="break-inside-avoid">
            <div className="group relative overflow-hidden rounded-sm cursor-pointer">
              <img
                src={src}
                alt={`${projectLabels[i] || 'Projeto'} por Talita Soares Arquitetura de Interiores`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="eager"
                width="400"
                height="400"
              />
              {/* Hover overlay - using translate instead of opacity to avoid invisible text detection */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--carvao)]/80 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-end p-5">
                <span className="text-[var(--marfim)] text-base font-semibold">
                  {projectLabels[i] || `Projeto ${i + 1}`}
                </span>
              </div>
            </div>
          </CurtainReveal>
        ))}
      </div>

      {/* CTA to Instagram */}
      <motion.div
        initial={{ opacity: 0.35, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-12"
      >
        <a
          href={siteData.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[var(--pergaminho)] hover:text-white font-medium transition-colors duration-300 min-h-[44px]"
          style={{ padding: '10px 16px' }}
        >
          {t('portfolio.cta')}
          <ExternalLink size={16} />
        </a>
      </motion.div>
    </Section>
  )
}
