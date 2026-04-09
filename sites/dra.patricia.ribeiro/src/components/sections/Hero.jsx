import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { RaizDecorativa } from '../ui/RaizViva'
import { siteData } from '../../data/content'

export default function Hero() {
  const { t } = useTranslation()
  const blobRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, {
        scale: 1.08,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
      {/* Padding top para navbar */}
      <div className="mx-auto max-w-[var(--max-width)] px-5 md:px-8 lg:px-16 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12 min-h-[calc(100vh-8rem)]">

          {/* Imagem lado direito (mobile: primeiro no DOM com flex-col, desktop: direito) */}
          <div className="relative w-full lg:w-[45%] flex-shrink-0">
            {/* Blob SVG pulsante atras da foto */}
            <div
              ref={blobRef}
              className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-[110%] h-[110%] opacity-30"
              aria-hidden="true"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path
                  d="M320,200 C320,280 260,350 180,340 C100,330 60,280 80,200 C100,120 140,60 220,70 C300,80 320,120 320,200Z"
                  fill="var(--color-accent)"
                />
              </svg>
            </div>

            {/* Raiz decorativa ao lado da foto */}
            <RaizDecorativa
              className="absolute -left-6 top-1/4 opacity-40 hidden md:block"
              size={120}
            />

            {/* Foto da Dra. Patricia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10"
            >
              <img
                src={siteData.images.hero}
                alt="Dra. Patrícia Ribeiro, endodontista sorrindo em consultório"
                className="w-full max-w-md mx-auto lg:max-w-none rounded-2xl object-cover aspect-square shadow-[var(--shadow-lg)]"
                fetchPriority="high"
                width="640"
                height="640"
              />
            </motion.div>
          </div>

          {/* Texto lado esquerdo */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base font-medium text-[var(--color-secondary)] tracking-wide uppercase"
            >
              {siteData.specialty} &mdash; {siteData.cro}
            </motion.span>

            <AnimatedText
              text={t('hero.title')}
              tag="h1"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[var(--font-display)] font-bold text-[var(--color-primary-dark)] leading-[1.1]"
              delay={0.3}
            />

            <motion.p
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-lg mx-auto lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button href={siteData.whatsappUrl} variant="primary">
                {t('hero.cta')}
              </Button>
              <Button
                href="#specialty"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('specialty')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t('hero.cta_secondary')}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
