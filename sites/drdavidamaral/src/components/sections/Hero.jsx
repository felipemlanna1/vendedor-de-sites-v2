import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { motion } from 'motion/react'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { images, doctorData } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Stagger the headline words
      const words = headlineRef.current?.querySelectorAll('.word')
      if (words?.length) {
        tl.fromTo(words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }
        )
      }

      tl.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )

      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      )

      tl.fromTo(badgeRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = t('hero.headline').split(' ')

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-surface overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16 w-full py-24 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Text side — 60% */}
          <div className="md:col-span-7 order-1 md:order-1">
            <h1
              ref={headlineRef}
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-text-primary mb-6"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.2em]">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-8"
            >
              {t('hero.subtitle')}
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
              <Button
                href={doctorData.whatsappUrl}
                variant="primary"
                className="text-base md:text-lg"
              >
                {t('hero.cta')}
              </Button>
              <Button
                href="#servicos"
                variant="secondary"
                className="text-base"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t('servicos.sectionLabel')}
              </Button>
            </div>

            <div
              ref={badgeRef}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-primary/10"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-text-primary font-medium">
                {t('hero.badge')}
              </span>
            </div>
          </div>

          {/* Image side — 40% */}
          <div className="md:col-span-5 order-2 md:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/10 to-primary-light/5 blur-xl" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={images.hero}
                  alt={`${doctorData.name} - Ortopedista e Traumatologista`}
                  className="w-full h-full object-cover object-top"
                  fetchpriority="high"
                  width="384"
                  height="384"
                />
              </div>
              {/* Floating badge with Logo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-4 -right-2 md:right-2 bg-white rounded-2xl shadow-lg px-3 py-2 border border-surface"
              >
                <Logo size="md" variant="icon" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
