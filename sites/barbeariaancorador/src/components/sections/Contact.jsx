import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, CalendarCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ content }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.contact-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-cards-grid', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.contact-whatsapp-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-whatsapp-cta', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.contact-social',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-social', start: 'top 90%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const infoCards = [
    {
      icon: Phone,
      label: 'Telefone',
      value: content.business.phone,
      href: `tel:${content.business.phone.replace(/\D/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: `${content.business.address}, ${content.business.neighborhood}, ${content.business.city}/${content.business.state}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.business.address + ', ' + content.business.neighborhood + ', ' + content.business.city + ', ' + content.business.state)}`,
      copyable: true,
    },
    {
      icon: Clock,
      label: 'Horário',
      value: content.contact.hours,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 md:py-24 lg:py-32"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-primary)] opacity-20" />

      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="contact-title text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.2em] mb-4 opacity-0"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            {content.contact.title}
          </h2>
          <p
            className="text-sm md:text-base max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            {content.contact.subtitle}
          </p>
        </div>

        {/* Split layout: Info cards + WhatsApp CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left: Contact info cards */}
          <div className="contact-cards-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CTA Agendar card */}
            <motion.a
              href={`https://wa.me/${content.business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card flex flex-col items-start gap-3 p-6 border border-[var(--color-primary)] rounded-sm transition-all duration-300"
              style={{ background: 'rgba(200,164,92,0.08)' }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(200,164,92,0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                <MessageCircle size={18} style={{ color: 'var(--color-background)' }} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.1em] mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
                  Agende agora
                </span>
                <span className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
                  Chamar no WhatsApp
                </span>
              </div>
            </motion.a>

            {infoCards.map((item, i) => {
              const Icon = item.icon
              return (
                <a
                  key={i}
                  href={item.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card flex flex-col items-start gap-3 p-6 border border-[var(--color-border)] rounded-sm transition-all duration-300 hover:border-[var(--color-primary)]"
                  style={{ background: 'var(--color-surface-light)' }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(200, 164, 92, 0.1)' }}>
                    <Icon size={18} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.1em] mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}>
                      {item.label}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
                      {item.value}
                    </span>
                    {item.copyable && (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(item.value) }}
                        className="mt-2 text-[10px] uppercase tracking-wider px-2 py-1 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Copiar endereço
                      </button>
                    )}
                  </div>
                </a>
              )
            })}
          </div>

          {/* Right: Google Map */}
          <div className="contact-whatsapp-cta rounded-sm overflow-hidden border border-[var(--color-border)]" style={{ minHeight: '320px' }}>
            <iframe
              src="https://maps.google.com/maps?q=Av.+Afonso+Delambert+Neto,+540,+Lagoa+da+Conceição,+Florianópolis,+SC,+Brazil&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Barbearia Ancorador - Lagoa da Conceição"
            />
          </div>
        </div>

        {/* Social links */}
        <div className="contact-social flex items-center justify-center gap-6 opacity-0">
          <a
            href={`https://www.instagram.com/${content.business.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            <Instagram size={18} style={{ color: 'var(--color-primary)' }} />
            @{content.business.instagram}
          </a>
          <span className="w-px h-4 bg-[var(--color-border)]" />
          <a
            href={`https://www.instagram.com/${content.business.instagram_owner}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            <Instagram size={18} style={{ color: 'var(--color-primary)' }} />
            @{content.business.instagram_owner}
          </a>
        </div>
      </div>

      {/* Decorative corner borders */}
      <div className="hidden lg:block">
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[var(--color-primary)] opacity-20" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[var(--color-primary)] opacity-20" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[var(--color-primary)] opacity-20" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[var(--color-primary)] opacity-20" />
      </div>
    </section>
  )
}
