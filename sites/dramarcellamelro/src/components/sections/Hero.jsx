import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronDown } from 'lucide-react'
import { siteData } from '../../data/content'
import Button from '../ui/Button'

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)

  const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(siteData.whatsappMessage)}`

  useGSAP(() => {
    const words = headlineRef.current?.querySelectorAll('.hero-word')
    if (words?.length) {
      gsap.from(words, {
        opacity: 0,
        filter: 'blur(8px)',
        y: 20,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3,
      })
    }
  }, { scope: sectionRef })

  const headline = t('hero.headline')
  const words = headline.split(' ')

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--color-primary-dark)]"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-dark)] opacity-90" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[var(--max-width)] flex-col lg:flex-row lg:items-center">
        {/* Text side — 50% on desktop */}
        <div className="flex flex-1 flex-col justify-center px-5 pt-28 pb-12 md:px-8 lg:w-1/2 lg:px-16 lg:pt-0 lg:pb-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4 font-[var(--font-body)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-background)]"
          >
            {siteData.alternateName?.split('—')[1]?.trim() || 'Odontologia Integrativa'}
          </motion.p>

          <h1
            ref={headlineRef}
            className="mb-6 font-[var(--font-display)] text-3xl font-semibold leading-tight tracking-tight text-[var(--color-background)] sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-6xl"
            style={{ textWrap: 'balance' }}
          >
            {words.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mb-8 max-w-md font-[var(--font-body)] text-lg leading-relaxed text-[var(--color-background)]/90"
          >
            {t('hero.subheadline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <Button href={whatsappUrl} variant="primary">
              {t('hero.cta')}
            </Button>
          </motion.div>
        </div>

        {/* Image side — 50% on desktop, full width stacked on mobile */}
        <div className="relative flex flex-1 items-end justify-center px-5 pb-8 lg:items-center lg:justify-end lg:px-0 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg"
          >
            {/* Organic mask shape */}
            <div className="overflow-hidden rounded-[40%_60%_55%_45%/55%_45%_60%_40%]">
              <img
                src="/images/profile-marcella.jpg"
                alt="Dra. Marcella Melro, cirurgia-dentista integrativa em Blumenau"
                width={600}
                height={750}
                className="aspect-[3/4] w-full object-cover object-top"
                fetchpriority="high"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-3 -z-10 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] border-2 border-[var(--color-secondary)]/20" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-[var(--font-body)] text-sm tracking-widest text-[var(--color-background)]">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-[var(--color-background)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
