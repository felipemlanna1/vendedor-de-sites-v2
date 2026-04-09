import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { t } = useTranslation()
  const imageRef = useRef(null)
  const sectionRef = useRef(null)

  const whatsappUrl = siteData.whatsapp
    ? `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(siteData.whatsappMessage)}`
    : siteData.instagram

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on hero image
      gsap.to(imageRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background)]"
    >
      {/* Content grid: 60/40 split */}
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-16 w-full grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center pt-24 pb-16 md:pt-0 md:pb-0">
        {/* Text — 60% */}
        <div className="md:col-span-3 flex flex-col gap-6 md:gap-8 order-2 md:order-1">
          <motion.span
            initial={{ opacity: 0.4, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm tracking-[0.2em] uppercase text-[var(--color-text-primary)]"
          >
            {t('hero.credential')}
          </motion.span>

          <AnimatedText
            text={t('hero.title')}
            tag="h1"
            delay={0.4}
            className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-[var(--color-text-primary)]"
          />

          <motion.p
            initial={{ opacity: 0.4, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="font-body text-base md:text-lg text-[var(--color-text-secondary)] max-w-md leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0.4, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              {t('hero.cta')}
            </Button>
            <Button href="#services" variant="secondary">
              {t('hero.cta_secondary')}
            </Button>
          </motion.div>
        </div>

        {/* Image — 40% */}
        <div className="md:col-span-2 order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-64 h-80 md:w-full md:h-[28rem] lg:h-[32rem] rounded-[var(--radius-xl)] overflow-hidden"
          >
            <img
              ref={imageRef}
              src={siteData.images.hero}
              alt="Dra. Iara Tavares - Especialista em Harmonização Facial"
              className="w-full h-full object-cover object-top"
              fetchPriority="high"
              width={480}
              height={600}
            />
            {/* Subtle golden overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-primary-light)]/15 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-[var(--color-primary)]/30 relative overflow-hidden">
          <motion.div
            className="w-full h-4 bg-[var(--color-primary)]"
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
