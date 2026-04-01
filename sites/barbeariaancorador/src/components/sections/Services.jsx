import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Services({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-title', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.services-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-subtitle', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.service-item',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-list', start: 'top 80%', once: true }
        }
      )

      gsap.fromTo('.services-promo',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-promo', start: 'top 90%', once: true }
        }
      )

      gsap.fromTo('.services-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-cta', start: 'top 95%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const isCombo = (name) => {
    const lower = name.toLowerCase()
    return lower.includes('+') || lower.includes('combo')
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ background: 'var(--color-surface)', padding: 'var(--section-padding-mobile)' }}
    >
      <style>{`
        @media (min-width: 1024px) {
          #services { padding: var(--section-padding-desktop) !important; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <h2
            className="services-title text-3xl md:text-5xl uppercase tracking-[0.25em] mb-4 opacity-0"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            {content.services.title}
          </h2>
          <p
            className="services-subtitle text-sm md:text-base opacity-0"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            {content.services.subtitle}
          </p>
        </div>

        {/* Decorative top ornament */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[var(--color-primary)] opacity-30" />
          <div
            className="w-2 h-2 rotate-45 border border-[var(--color-primary)] opacity-50"
          />
          <div className="flex-1 h-px bg-[var(--color-primary)] opacity-30" />
        </div>

        {/* Services list — elegant menu board */}
        <div className="services-list">
          {content.services.items.map((service, i) => {
            const combo = isCombo(service.name)
            return (
              <motion.div
                key={i}
                className={`service-item opacity-0 ${combo ? 'relative' : ''}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Combo special treatment */}
                {combo && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ background: 'var(--color-primary)' }}
                  />
                )}

                <div
                  className={`py-6 ${combo ? 'pl-5' : ''}`}
                  style={combo ? { background: 'rgba(200, 164, 92, 0.04)' } : undefined}
                >
                  {/* Name + dotted line + price row */}
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg md:text-xl whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                    >
                      {service.name}
                    </span>

                    {combo && (
                      <span
                        className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 border border-[var(--color-primary)] rounded-sm whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                      >
                        {t('services.combo')}
                      </span>
                    )}

                    {/* Decorative dotted gold line */}
                    <span
                      className="flex-1 min-w-[30px] relative top-[-3px]"
                      style={{
                        borderBottom: '2px dotted var(--color-primary)',
                        opacity: 0.3
                      }}
                    />

                    <span
                      className="text-lg md:text-xl whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                    >
                      {t('services.currency')}{service.price}
                    </span>
                  </div>

                  {/* Description */}
                  {service.description && (
                    <p
                      className="mt-2 text-sm"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
                    >
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Gold separator between items */}
                {i < content.services.items.length - 1 && (
                  <div className="w-full h-px" style={{ background: 'var(--color-primary)', opacity: 0.15 }} />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Decorative bottom ornament */}
        <div className="flex items-center gap-4 mt-10">
          <div className="flex-1 h-px bg-[var(--color-primary)] opacity-30" />
          <div
            className="w-2 h-2 rotate-45 border border-[var(--color-primary)] opacity-50"
          />
          <div className="flex-1 h-px bg-[var(--color-primary)] opacity-30" />
        </div>

        {/* Promo banner */}
        {content.services.promo && (
          <div className="services-promo mt-10 opacity-0">
            <div
              className="relative flex flex-col sm:flex-row items-center gap-3 px-6 py-5 text-center justify-center overflow-hidden"
              style={{
                background: 'rgba(200, 164, 92, 0.06)',
                borderLeft: '3px solid var(--color-primary)'
              }}
            >
              <Sparkles size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
              >
                {t('services.promoLabel')}
              </span>
              <span className="hidden sm:block w-px h-4 bg-[var(--color-primary)] opacity-40" />
              <span
                className="text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}
              >
                {content.services.promo}
              </span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="services-cta mt-12 text-center opacity-0">
          <a
            href={content.business.booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-bg)',
              background: 'var(--color-primary)',
              letterSpacing: '0.15em'
            }}
          >
            {content.contact?.cta_text || 'Agende pelo WhatsApp'}
          </a>
        </div>
      </div>
    </section>
  )
}
