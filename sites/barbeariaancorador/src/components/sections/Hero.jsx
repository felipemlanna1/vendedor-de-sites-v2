import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'

export default function Hero({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const q = (s) => sectionRef.current?.querySelector(s)
      const qa = (s) => sectionRef.current?.querySelectorAll(s)

      if (prefersReduced) {
        gsap.set(qa('[data-animate]'), { opacity: 1, y: 0, scale: 1 })
        gsap.set(qa('.hero-line'), { scaleX: 1, opacity: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // 1. BG fades in
      tl.fromTo(q('.hero-bg'), { opacity: 0 }, { opacity: 1, duration: 1.2 })

      // 2. Corners
      .fromTo(qa('.hero-corner'), { opacity: 0 }, { opacity: 0.5, duration: 0.5, stagger: 0.05 }, '-=0.8')

      // 3. Logo scales in
      .fromTo(q('.hero-logo'),
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.4'
      )

      // 5. Lines expand
      .fromTo(qa('.hero-line'), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5 }, '-=0.2')

      // 6. Title
      .fromTo(q('.hero-title-1'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .fromTo(q('.hero-title-2'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

      // 7. Tagline + subtitle
      .fromTo(q('.hero-tagline'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
      .fromTo(q('.hero-subtitle'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')

      // 8. CTA
      .fromTo(q('.hero-cta'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1')

      // 9. Scroll
      .fromTo(q('.hero-scroll'), { opacity: 0 }, { opacity: 0.5, duration: 0.6 }, '-=0.2')

      // Ambient: logo glow pulse
      gsap.to(q('.hero-logo-glow'), {
        opacity: 0.2, scale: 1.3, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
      })

      // Rain uses pure CSS @keyframes — no GSAP needed

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'var(--color-background)',
        minHeight: '100dvh',
        paddingTop: '5rem',
      }}
    >
      {/* Radial glow */}
      <div className="hero-bg absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(200,164,92,0.08) 0%, rgba(200,164,92,0.02) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Raining barber tools — pure CSS animation */}
      <style>{`
        @keyframes hero-rain {
          0% { top: -10%; opacity: 0; transform: rotate(0deg); }
          8% { opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { top: 110%; opacity: 0; transform: rotate(15deg); }
        }
        .hero-rain-icon {
          position: absolute;
          pointer-events: none;
          animation: hero-rain var(--dur) var(--delay) linear infinite both;
          color: var(--color-primary);
          z-index: 1;
          top: -10%;
          opacity: 0;
        }
      `}</style>
      {[
        { left: '5%', dur: '8s', delay: '0s', size: 21, icon: 'scissors' },
        { left: '12%', dur: '11s', delay: '2s', size: 24, icon: 'anchor' },
        { left: '20%', dur: '9s', delay: '4s', size: 18, icon: 'razor' },
        { left: '28%', dur: '13s', delay: '1s', size: 27, icon: 'ship' },
        { left: '35%', dur: '10s', delay: '3s', size: 21, icon: 'anchor' },
        { left: '43%', dur: '12s', delay: '5s', size: 24, icon: 'scissors' },
        { left: '50%', dur: '8s', delay: '2.5s', size: 18, icon: 'anchor' },
        { left: '58%', dur: '11s', delay: '0.5s', size: 27, icon: 'razor' },
        { left: '65%', dur: '9s', delay: '3.5s', size: 21, icon: 'ship' },
        { left: '72%', dur: '13s', delay: '1.5s', size: 24, icon: 'anchor' },
        { left: '80%', dur: '10s', delay: '4.5s', size: 18, icon: 'scissors' },
        { left: '88%', dur: '8s', delay: '2s', size: 21, icon: 'anchor' },
        { left: '95%', dur: '12s', delay: '0s', size: 24, icon: 'razor' },
        { left: '8%', dur: '14s', delay: '6s', size: 18, icon: 'ship' },
        { left: '47%', dur: '9s', delay: '7s', size: 21, icon: 'anchor' },
        { left: '3%', dur: '10s', delay: '1.5s', size: 24, icon: 'razor' },
        { left: '15%', dur: '12s', delay: '3.5s', size: 18, icon: 'ship' },
        { left: '24%', dur: '8s', delay: '5.5s', size: 21, icon: 'scissors' },
        { left: '32%', dur: '14s', delay: '0.5s', size: 27, icon: 'anchor' },
        { left: '40%', dur: '9s', delay: '4s', size: 18, icon: 'anchor' },
        { left: '48%', dur: '11s', delay: '6.5s', size: 24, icon: 'razor' },
        { left: '55%', dur: '13s', delay: '1s', size: 21, icon: 'ship' },
        { left: '62%', dur: '8s', delay: '3s', size: 27, icon: 'scissors' },
        { left: '70%', dur: '10s', delay: '5s', size: 18, icon: 'anchor' },
        { left: '78%', dur: '12s', delay: '2.5s', size: 24, icon: 'anchor' },
        { left: '85%', dur: '9s', delay: '7.5s', size: 21, icon: 'razor' },
        { left: '92%', dur: '14s', delay: '4.5s', size: 18, icon: 'ship' },
        { left: '10%', dur: '11s', delay: '8s', size: 27, icon: 'scissors' },
        { left: '53%', dur: '8s', delay: '6s', size: 24, icon: 'anchor' },
        { left: '75%', dur: '13s', delay: '0s', size: 21, icon: 'anchor' },
      ].map((item, i) => (
        <div key={i} className="hero-rain-icon" style={{ left: item.left, '--dur': item.dur, '--delay': item.delay }}>
          {item.icon === 'scissors' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
          )}
          {item.icon === 'razor' && (
            <svg width={item.size} height={item.size} viewBox="0 0 122.88 101.72" fill="currentColor">
              <path d="M14.55,62.32,79,65.64,60.37,46.92l-9,1.38a1.24,1.24,0,0,1-1.08-.36L13.92,11.05a1.27,1.27,0,0,1,0-1.77L21.07,2C22.37,.7,23.19-.14,25.56,0h0c2.52.18,4,1.68,5.52,3.2L93.85,66.4l7.18.37a13.55,13.55,0,0,1,12.81,14.1v.25a12.57,12.57,0,0,1-.41,2.55,12.94,12.94,0,0,1,.3,1.48v.07a13.42,13.42,0,0,1,.13,1.77,14.22,14.22,0,0,1-.11,1.73,3.46,3.46,0,0,1,.44.34l7.71,7.21a3.16,3.16,0,1,1-4.33,4.59L111.24,95a14.69,14.69,0,0,1-1.36,1.58,13.47,13.47,0,0,1-9.56,4H13.73a14.4,14.4,0,0,1-5.38-1,12.73,12.73,0,0,1-6.19-5.14A14.48,14.48,0,0,1,0,86.67a17,17,0,0,1,1.18-6.13,13.37,13.37,0,0,1-.83-5.31V75A13.57,13.57,0,0,1,14.55,62.32Z"/>
            </svg>
          )}
          {item.icon === 'ship' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18l1.8-4.2h14.4L21 18H3zm9-14v8m0-8l6 4.5H12m0-1.5L7.5 11H12M12 2a1 1 0 011 1v9h-2V3a1 1 0 011-1zm-7.5 9h15l2.5 5.8V18a1 1 0 01-1 1H3a1 1 0 01-1-1v-1.2L4.5 11z"/>
            </svg>
          )}
          {item.icon === 'anchor' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a3 3 0 00-1 5.83V11H8a1 1 0 000 2h3v6.92A8 8 0 014.07 13H5a1 1 0 000-2H2a1 1 0 000 2h.07A10 10 0 0012 22a10 10 0 009.93-9H22a1 1 0 000-2h-3a1 1 0 000 2h.93A8 8 0 0113 19.92V13h3a1 1 0 000-2h-3V7.83A3 3 0 0012 2zm0 2a1 1 0 110 2 1 1 0 010-2z"/>
            </svg>
          )}
        </div>
      ))}

      {/* Corner ornaments */}
      <div className="hero-corner absolute top-[5.5rem] left-5 md:left-8 w-8 h-8 md:w-12 md:h-12 border-t border-l" style={{ borderColor: 'var(--color-primary)', opacity: 0 }} />
      <div className="hero-corner absolute top-[5.5rem] right-5 md:right-8 w-8 h-8 md:w-12 md:h-12 border-t border-r" style={{ borderColor: 'var(--color-primary)', opacity: 0 }} />
      <div className="hero-corner absolute bottom-5 left-5 md:left-8 w-8 h-8 md:w-12 md:h-12 border-b border-l" style={{ borderColor: 'var(--color-primary)', opacity: 0 }} />
      <div className="hero-corner absolute bottom-5 right-5 md:right-8 w-8 h-8 md:w-12 md:h-12 border-b border-r" style={{ borderColor: 'var(--color-primary)', opacity: 0 }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-16 max-w-3xl mx-auto">

        {/* Logo */}
        <div className="relative hero-logo mb-6 md:mb-8" style={{ opacity: 0 }}>
          <div
            className="hero-logo-glow absolute inset-0 rounded-full opacity-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(200,164,92,0.25) 0%, transparent 70%)', transform: 'scale(2.5)' }}
          />
          <img
            src="/images/logo-profile-hd.jpg"
            alt="Logo Barbearia Ancorador — barbearia clássica Lagoa da Conceição Florianópolis"
            className="relative w-64 h-64 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover"
            style={{ border: '2px solid var(--color-primary)', boxShadow: '0 0 60px rgba(200,164,92,0.2)' }}
            fetchPriority="high"
          />
        </div>

        {/* Line top */}
        <div className="hero-line w-14 md:w-36 h-[2px] mb-5 md:mb-7 origin-center" style={{ background: 'var(--color-primary)', transform: 'scaleX(0)' }} />

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)', textShadow: '0 0 50px rgba(200,164,92,0.2)' }}>
          <span className="hero-title-1 block text-3xl sm:text-5xl md:text-4xl lg:text-5xl tracking-[0.2em] md:tracking-[0.25em] leading-none mb-2 md:mb-3" style={{ opacity: 0 }}>
            BARBEARIA
          </span>
          <span className="hero-title-2 block text-3xl sm:text-5xl md:text-4xl lg:text-5xl tracking-[0.2em] md:tracking-[0.25em] leading-none" style={{ opacity: 0 }}>
            ANCORADOR
          </span>
        </h1>

        {/* Line mid */}
        <div className="hero-line w-14 md:w-36 h-[2px] mt-5 md:mt-7 mb-4 md:mb-5 origin-center" style={{ background: 'var(--color-primary)', transform: 'scaleX(0)' }} />

        {/* Tagline */}
        <p className="hero-tagline text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 md:mb-3" data-animate style={{ opacity: 0 }}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
          {content.business?.tagline || 'Barbearia de Verdade'}
        </p>

        {/* Subtitle */}
        <p className="hero-subtitle text-xs md:text-sm mb-7 md:mb-9 max-w-xs md:max-w-sm" data-animate style={{ opacity: 0 }}
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          {content.hero.subtitle}
        </p>

        {/* CTA */}
        <motion.a
          href={`https://wa.me/${content.business?.whatsapp || '5548988397456'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta inline-flex items-center gap-3 px-8 py-3.5 md:px-14 md:py-4 uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm font-semibold whitespace-nowrap"
          style={{
            opacity: 0,
            fontFamily: 'var(--font-display)',
            background: 'var(--color-primary)',
            color: 'var(--color-background)',
            boxShadow: '0 4px 30px rgba(200,164,92,0.25)',
            transition: 'all 0.3s',
          }}
          whileHover={{ scale: 1.04, boxShadow: '0 8px 50px rgba(200,164,92,0.45)' }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle size={18} strokeWidth={2} />
          {t('contact.whatsappCta')}
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ opacity: 0 }}>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
          {t('hero.scroll')}
        </span>
        <motion.svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--color-primary)', opacity: 0.5 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="12" cy="5" r="3"/>
          <line x1="12" y1="22" x2="12" y2="8"/>
          <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
        </motion.svg>
      </div>
    </section>
  )
}
