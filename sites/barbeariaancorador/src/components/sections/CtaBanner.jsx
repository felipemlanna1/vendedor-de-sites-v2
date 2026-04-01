import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Anchor } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function CtaBanner({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveal from bottom
      gsap.fromTo('.cta-banner-heading',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )

      gsap.fromTo('.cta-banner-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )

      // Button scale in
      gsap.fromTo('.cta-banner-btn',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.4, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{
          backgroundImage: 'url(/images/experiencia-kid.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle gold gradient overlay at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(200, 164, 92, 0.05) 0%, transparent 30%, transparent 70%, rgba(200, 164, 92, 0.05) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-8 md:px-16 text-center">
        <h2
          className="cta-banner-heading text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.15em] mb-4 opacity-0"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
        >
          {t('ctaBanner.title')}
        </h2>

        <p
          className="cta-banner-sub text-base md:text-lg mb-10 opacity-0"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
        >
          {t('ctaBanner.subtitle')}
        </p>

        <motion.a
          href={content.business.booking_url || `https://wa.me/${content.business.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-banner-btn inline-flex items-center gap-3 px-12 py-5 text-lg uppercase tracking-[0.15em] font-semibold rounded-sm transition-all duration-300 opacity-0"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'var(--color-primary)',
            color: 'var(--color-background)',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200, 164, 92, 0.35)' }}
          whileTap={{ scale: 0.97 }}
        >
          <Anchor size={22} />
          Agende seu horário
        </motion.a>
      </div>
    </section>
  )
}
