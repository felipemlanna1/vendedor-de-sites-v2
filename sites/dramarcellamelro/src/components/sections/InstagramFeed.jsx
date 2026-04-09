import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Instagram } from 'lucide-react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function InstagramFeed() {
  const { t } = useTranslation()

  return (
    <Section id="instagram" background="bg-[var(--color-surface)]">
      <div className="mb-12 text-center md:mb-16">
        <ScrollReveal>
          <span className="mb-3 inline-block font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary-dark)]">
            {t('instagram.title')}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mx-auto max-w-2xl font-[var(--font-display)] text-3xl font-medium leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            {t('instagram.subtitle')}
          </h2>
        </ScrollReveal>
      </div>

      {/* Instagram grid with organic shapes */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {siteData.instagramPosts.map((post, i) => (
          <motion.a
            key={post.src}
            href={siteData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? 1 : -1 }}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={post.src}
              alt={post.alt}
              width={300}
              height={300}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-primary-dark)]/0 transition-colors duration-300 group-hover:bg-[var(--color-primary-dark)]/40">
              <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.3}>
        <div className="mt-10 text-center md:mt-14">
          <Button href={siteData.instagramUrl} variant="secondary">
            {t('instagram.cta')}
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  )
}
