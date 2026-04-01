import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Instagram } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Captain({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // Text reveal
      gsap.fromTo('.captain-title',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.captain-title', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.captain-subtitle',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.captain-subtitle', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.captain-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.captain-text', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.captain-quote',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.45, ease: 'power3.out',
          scrollTrigger: { trigger: '.captain-quote', start: 'top 85%', once: true }
        }
      )

      // Image frame
      gsap.fromTo('.captain-image-wrap',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.captain-image-wrap', start: 'top 85%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="captain"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-background)', padding: 'var(--section-padding-mobile)' }}
    >
      <style>{`
        @media (min-width: 1024px) {
          #captain { padding: var(--section-padding-desktop) !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Image */}
        <div className="captain-image-wrap w-full lg:w-1/2 opacity-0">
          <div className="relative p-2 border border-[var(--color-primary)] inline-block">
            {/* Gold frame inner border */}
            <div className="relative overflow-hidden">
              <img
                ref={imageRef}
                src="/images/sucata/portrait-classic.webp"
                alt="Bruno 'Sucata' — Capitão da Ancorador"
                className="w-full h-auto max-h-[600px] object-cover"
                loading="lazy"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-30" />
            </div>
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[var(--color-primary)]" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[var(--color-primary)]" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[var(--color-primary)]" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[var(--color-primary)]" />
          </div>
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2">
          <h2
            className="captain-title text-2xl md:text-4xl uppercase tracking-[0.2em] mb-2 opacity-0"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            {t('captain.title')}
          </h2>

          <p
            className="captain-subtitle text-lg md:text-xl mb-8 opacity-0"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
          >
            Bruno &lsquo;Sucata&rsquo;
          </p>

          <div className="w-12 h-px bg-[var(--color-primary)] mb-8" />

          <p
            className="captain-text mb-8 opacity-0"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.8,
              fontSize: '1rem'
            }}
          >
            {t('captain.text')}
          </p>

          <blockquote
            className="captain-quote pl-5 border-l-2 border-[var(--color-primary)] mb-8 opacity-0"
          >
            <p
              className="italic text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-primary)',
                lineHeight: 1.6
              }}
            >
              &ldquo;{t('captain.quote')}&rdquo;
            </p>
          </blockquote>

          <motion.a
            href={`https://www.instagram.com/${content.owner.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
            whileHover={{ x: 4 }}
          >
            <Instagram size={18} style={{ color: 'var(--color-primary)' }} />
            <span>@{content.owner.instagram}</span>
            <span className="text-[var(--color-text-muted)]">— {t('captain.followInstagram')}</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
