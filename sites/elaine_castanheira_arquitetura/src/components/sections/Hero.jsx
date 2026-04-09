import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { t } = useTranslation()
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: 80,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-end overflow-hidden">
      <img
        ref={imageRef}
        src={siteData.images.hero}
        alt="Projeto Costa Azul - sala de jantar e living integrados projetados por Elaine Castanheira"
        className="absolute inset-0 w-full h-full object-cover"
        fetchpriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2420]/95 via-[#2A2420]/60 to-[#2A2420]/30" />

      <div className="relative z-10 mx-auto max-w-[var(--max-width)] px-6 md:px-10 lg:px-16 pb-16 md:pb-24 w-full">
        <div className="max-w-3xl bg-[#2A2420]/80 backdrop-blur-sm rounded-2xl p-6 md:p-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-[var(--font-body)] text-sm md:text-base font-light tracking-[0.2em] uppercase text-white/80 mb-4 md:mb-6"
          >
            {t('hero.subtitle')}
          </motion.p>

          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight">
            {t('hero.title')}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-text-primary)] px-8 py-3.5 rounded-full font-medium text-sm md:text-base hover:bg-white/90 transition-colors"
            >
              {t('hero.cta')}
            </motion.a>
            <motion.a
              href="#projetos"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 border border-white/50 text-white px-8 py-3.5 rounded-full font-medium text-sm md:text-base hover:bg-white/10 transition-colors"
            >
              {t('hero.scroll')}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
