import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '../../data/content'
import BlueprintGrid from '../ui/BlueprintGrid'
import Button from '../ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { t } = useTranslation()
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text clip-path horizontal wipe
      if (textRef.current) {
        gsap.from(textRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1,
          ease: 'circ.inOut',
          delay: 0.3,
        })
      }

      // Image parallax on scroll
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[var(--linho)]" style={{ display: 'flex' }}>
      <BlueprintGrid opacity={0.08} />

      <div className="relative z-10 mx-auto max-w-[var(--max-width-full)] w-full overflow-hidden" style={{ padding: '0 32px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-8 lg:gap-16 items-center min-h-[80dvh]">
          {/* Left — Text */}
          <div ref={textRef} className="pt-24 lg:pt-0">
            <motion.p
              initial={{ opacity: 0.35, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm md:text-base font-medium tracking-[0.15em] uppercase text-[var(--terracota)] mb-4 md:mb-6"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[var(--carvao)] leading-[1.05] mb-6"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0.35, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-sm tracking-wider text-[var(--grafite)] mb-8 uppercase"
            >
              {t('hero.tagline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0.35, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Button href="#contact">{t('hero.cta')}</Button>
            </motion.div>
          </div>

          {/* Right — Image with organic mask */}
          <motion.div
            initial={{ opacity: 0.35, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div
              className="overflow-hidden"
              style={{ borderRadius: '40% 60% 55% 45% / 60% 40% 45% 55%' }}
            >
              <img
                ref={imageRef}
                src={siteData.images.hero}
                alt="Ambiente residencial sofisticado projetado por Talita Soares Arquitetura de Interiores em Florianopolis SC"
                className="w-full aspect-[3/2] object-cover will-change-transform"
                fetchpriority="high"
                width="720"
                height="480"
              />
            </div>
            {/* Decorative border echo */}
            <div
              className="absolute -inset-3 border border-[var(--terracota)]/20 -z-10"
              style={{ borderRadius: '40% 60% 55% 45% / 60% 40% 45% 55%' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile hero background - decorative only */}
      <div className="absolute bottom-0 right-0 w-2/3 h-1/3 lg:hidden overflow-hidden opacity-20"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[var(--pergaminho)]" />
      </div>
    </section>
  )
}
