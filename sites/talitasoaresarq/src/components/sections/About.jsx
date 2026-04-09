import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import BlurRevealText from '../ui/BlurRevealText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about" background="bg-[var(--marfim)]" layout="flex">
      {/* Full-width editorial headline */}
      <div className="mb-12 md:mb-16 max-w-4xl mx-auto text-center">
        <BlurRevealText
          text={t('about.title')}
          tag="h2"
          className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--carvao)] leading-tight"
          highlightWords={['\u00f3bvio', 'obvious']}
        />
      </div>

      {/* Two columns: text + image */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        <div className="lg:w-3/5">
          <motion.p
            initial={{ opacity: 0.35, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-[var(--carvao)] leading-relaxed mb-8 font-light"
          >
            {t('about.description')}
          </motion.p>

          {/* Philosophy quote with sidebar */}
          <motion.blockquote
            initial={{ opacity: 0.35, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-l-2 border-[var(--terracota)] mb-8"
            style={{ paddingLeft: '24px' }}
          >
            <p className="text-base md:text-lg text-[var(--grafite)] leading-relaxed italic">
              {t('about.philosophy')}
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0.35, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button href="#portfolio" variant="secondary">
              {t('about.cta')}
            </Button>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0.35, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-2/5 relative"
        >
          <img
            src={siteData.images.about}
            alt="Sala de estar projetada por Talita Soares com atencao aos detalhes de iluminacao e materiais"
            className="w-full aspect-[3/2] object-cover rounded-sm"
            loading="lazy"
            width="576"
            height="384"
          />
          {/* Radial glow behind */}
          <div
            className="absolute -inset-8 -z-10 rounded-sm"
            style={{ background: 'radial-gradient(ellipse at center, var(--janela) 0%, transparent 70%)' }}
          />
        </motion.div>
      </div>
    </Section>
  )
}
