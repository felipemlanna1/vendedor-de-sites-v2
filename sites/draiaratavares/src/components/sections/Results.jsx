import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Results() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const gallery = siteData.gallery

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  const openLightbox = (index) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }

  const navigate = (dir) => {
    setLightboxIndex((prev) => {
      const next = prev + dir
      if (next < 0) return gallery.length - 1
      if (next >= gallery.length) return 0
      return next
    })
  }

  return (
    <section
      id="results"
      className="px-5 py-[var(--space-section)] md:px-8 lg:px-16 bg-[var(--color-dark)]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedText
            text={t('results.title')}
            tag="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-on-dark)] mb-4"
          />
          <ScrollReveal delay={0.2}>
            <p className="font-body text-base md:text-lg text-[var(--color-text-on-dark)]/85 max-w-xl mx-auto">
              {t('results.subtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {gallery.map((item, i) => (
            <ScrollReveal key={item.src} delay={i * 0.08}>
              <motion.div
                onClick={() => openLightbox(i)}
                whileHover={{ scale: 1.02 }}
                className="relative group rounded-[var(--radius-md)] overflow-hidden aspect-[4/5] cursor-pointer w-full"
                role="img"
                aria-label={item.alt}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  width={400}
                  height={500}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[var(--color-dark)]/0 group-hover:bg-[var(--color-dark)]/30 transition-all duration-500 flex items-end p-4">
                  <span className="font-body text-sm text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 invisible group-hover:visible">
                    {item.procedure}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10 md:mt-14">
            <p className="font-body text-sm text-[var(--color-text-on-dark)]/60 mb-6 max-w-lg mx-auto">
              {t('results.disclaimer')}
            </p>
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="border-[var(--color-primary-light)] text-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-dark)]"
            >
              {t('results.cta')}
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white z-10"
              aria-label="Fechar"
            >
              <X size={28} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white z-10"
              aria-label="Anterior"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white z-10"
              aria-label="Proximo"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-[var(--radius-md)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
