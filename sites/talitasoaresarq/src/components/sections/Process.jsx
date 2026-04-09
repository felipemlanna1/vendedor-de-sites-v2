import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '../layout/Section'

gsap.registerPlugin(ScrollTrigger)

const stepKeys = ['step1', 'step2', 'step3', 'step4']

export default function Process() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    // Only horizontal scroll on desktop (>1024px)
    if (window.innerWidth < 1024) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container) return

      const scrollAmount = track.scrollWidth - container.offsetWidth

      gsap.to(track, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 20%',
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1.2,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="process" background="bg-[var(--linho)]">
      <motion.h2
        initial={{ opacity: 0.35, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--carvao)] text-center mb-12 md:mb-16"
      >
        {t('process.title')}
      </motion.h2>

      <div ref={containerRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8"
        >
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0.35, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative w-full lg:w-[300px] flex-shrink-0"
            >
              {/* Step number */}
              <span className="font-display text-[60px] lg:text-[100px] text-[var(--pergaminho)]/30 absolute -top-4 left-0 leading-none select-none overflow-hidden">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative bg-[var(--marfim)] border border-[var(--pergaminho)] rounded-sm" style={{ padding: '32px' }}>
                <h3 className="font-display text-xl lg:text-2xl text-[var(--carvao)] mb-3">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="text-[var(--grafite)] leading-relaxed text-sm">
                  {t(`process.steps.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
