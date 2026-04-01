import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Anchor } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Ship image reveal
      gsap.fromTo('.about-ship',
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-image-wrapper', start: 'top 75%', once: true }
        }
      )

      // Badge
      gsap.fromTo('.about-badge',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-badge', start: 'top 85%', once: true }
        }
      )

      // Title
      gsap.fromTo('.about-title',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-title', start: 'top 85%', once: true }
        }
      )

      // Paragraphs stagger
      gsap.fromTo('.about-paragraph',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.25, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-paragraphs', start: 'top 80%', once: true }
        }
      )

      // Quote
      gsap.fromTo('.about-quote',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-quote', start: 'top 85%', once: true }
        }
      )

      // Image reveal
      gsap.fromTo('.about-image-wrapper',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-image-wrapper', start: 'top 80%', once: true }
        }
      )

      // CTA
      gsap.fromTo('.about-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-cta', start: 'top 90%', once: true }
        }
      )

      // Bottom divider
      gsap.fromTo('.about-divider-line-left',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-divider', start: 'top 90%', once: true }
        }
      )
      gsap.fromTo('.about-divider-line-right',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-divider', start: 'top 90%', once: true }
        }
      )
      gsap.fromTo('.about-divider-anchor',
        { opacity: 0, scale: 0.5, rotate: -180 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-divider', start: 'top 90%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-20 md:py-32 lg:py-40"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">

          {/* Ship image column */}
          <div className="about-image-wrapper w-full lg:w-[40%] order-first lg:order-last opacity-0 flex-shrink-0">
            <div className="relative">
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full border border-[var(--color-primary)] pointer-events-none opacity-40" />
              <div className="relative overflow-hidden" style={{ background: 'var(--color-background)' }}>
                <img
                  src="/images/navio-golden.jpg"
                  alt="Navio clássico navegando em mar dourado — Nossa Viagem"
                  className="about-ship w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-40" />
              </div>
              <div className="w-12 h-[2px] mt-4" style={{ background: 'var(--color-primary)' }} />
            </div>
          </div>

          {/* Text column */}
          <div className="w-full lg:w-[60%] order-last lg:order-first">

            {/* Desde badge */}
            <div className="about-badge inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-primary)] rounded-full mb-8 opacity-0">
              <Anchor size={14} style={{ color: 'var(--color-primary)' }} />
              <span
                className="text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
              >
                Desde {content.business.founded}
              </span>
            </div>

            {/* Title */}
            <h2
              className="about-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] mb-10 opacity-0"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
            >
              {t('about.title')}
            </h2>

            {/* Paragraphs */}
            <div className="about-paragraphs space-y-6 mb-12">
              {[t('about.text'), t('about.text2'), t('about.text3')].filter(Boolean).map((text, i) => (
                <p
                  key={i}
                  className="about-paragraph opacity-0"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.9,
                    fontSize: '1.05rem'
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="about-quote relative pl-8 border-l-4 border-[var(--color-primary)] mb-14 opacity-0 py-4">
              {/* Large decorative quotation mark */}
              <span
                className="absolute -top-2 -left-1 text-5xl md:text-6xl leading-none select-none pointer-events-none"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)', opacity: 0.25 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p
                className="relative text-base md:text-lg italic"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-primary)',
                  lineHeight: 1.7
                }}
              >
                {t('about.quote')}
              </p>
            </blockquote>

            {/* CTA to services */}
            <motion.a
              href="#services"
              className="about-cta inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] uppercase tracking-[0.12em] text-xs opacity-0 transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-[var(--color-background)]"
              style={{ fontFamily: 'var(--font-display)' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Anchor size={14} />
              {t('about.cta')}
            </motion.a>
          </div>
        </div>

        {/* Gold divider ornament at bottom */}
        <div className="about-divider flex items-center justify-center gap-6 mt-24 md:mt-32">
          <div
            className="about-divider-line-left flex-1 h-[1px] bg-[var(--color-primary)] opacity-30 origin-right"
            style={{ transform: 'scaleX(0)' }}
          />
          <div className="about-divider-anchor opacity-0">
            <Anchor size={24} style={{ color: 'var(--color-primary)', opacity: 0.5 }} />
          </div>
          <div
            className="about-divider-line-right flex-1 h-[1px] bg-[var(--color-primary)] opacity-30 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  )
}
