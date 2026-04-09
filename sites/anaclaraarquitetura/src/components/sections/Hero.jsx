import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import { siteData } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Letter reveal
      const chars = titleRef.current?.querySelectorAll('.hero-char')
      if (chars) {
        gsap.set(chars, { opacity: 0, y: 60 })
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.4,
        })
      }

      // Image parallax on scroll
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const title = t('hero.title')

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-secondary)]"
    >
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

      {/* Content grid — text left, image right */}
      <div className="relative z-10 mx-auto max-w-[var(--max-width)] w-full px-6 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left — Text content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          {/* Overline */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] mb-4 md:mb-6"
          >
            Arquitetura &amp; Urbanismo
          </motion.span>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[var(--color-background)] leading-[0.9]"
          >
            {title.split('').map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={{ minWidth: char === ' ' ? '0.3em' : undefined }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 h-px w-24 lg:w-32 bg-[var(--color-accent)] origin-left mx-auto lg:mx-0"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 font-display text-xl md:text-2xl lg:text-3xl font-medium italic text-[var(--color-background)] tracking-wide"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-4 max-w-lg text-base md:text-lg text-[var(--color-primary-light)] font-light mx-auto lg:mx-0"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
          >
            <motion.a
              href={siteData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[var(--color-accent-btn)] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              {t('nav.cta')}
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 border border-[var(--color-primary-light)]/40 text-[var(--color-background)] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              {t('hero.cta')}
            </motion.a>
          </motion.div>
        </div>

        {/* Right — Portrait photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[460px]">
            {/* Accent border frame — offset for depth */}
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full border-2 border-[var(--color-accent)]/40 rounded-2xl pointer-events-none" />

            {/* Photo */}
            <div ref={imageRef} className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/ana-clara-retrato.png"
                alt="Ana Clara de Souza Pereira — Arquiteta e Urbanista"
                className="w-full h-auto object-cover"
                width={460}
                height={460}
                fetchPriority="high"
              />
              {/* Subtle gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--color-secondary)]/40 to-transparent" />
            </div>

            {/* Floating credential badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-[var(--color-background)] rounded-xl px-4 py-3 shadow-lg"
            >
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">Mestre &amp; Doutoranda</p>
              <p className="text-sm font-bold text-[var(--color-primary-dark)]">UFV</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-[var(--color-primary-light)]/60 tracking-widest uppercase">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[var(--color-primary-light)]/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
