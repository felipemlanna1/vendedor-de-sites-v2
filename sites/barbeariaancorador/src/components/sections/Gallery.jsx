import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Instagram } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { src: '/images/sucata/portrait-classic.webp', alt: 'Bruno Sucata - barbeiro clássico na Barbearia Ancorador Florianópolis', span: 'row-span-2' },
  { src: '/images/corte-classico-1.jpg', alt: 'Corte clássico masculino na Barbearia Ancorador Lagoa da Conceição', span: '' },
  { src: '/images/posts/post-2.jpg', alt: 'Sucata cortando cabelo na Barbearia Ancorador', span: '' },
  { src: '/images/posts/post-6.jpg', alt: 'Cliente com corte fresco na Barbearia Ancorador Florianópolis', span: '' },
  { src: '/images/corte-classico-4.jpg', alt: 'Corte clássico pompadour na barbearia clássica Florianópolis', span: 'row-span-2' },
  { src: '/images/sucata/work-4.webp', alt: 'Corte Black Power na Barbearia Ancorador Lagoa da Conceição', span: '' },
  { src: '/images/posts/post-7.jpg', alt: 'Barbering clássico com capa listrada na Ancorador', span: '' },
  { src: '/images/sucata/work-5.webp', alt: 'Interior da Barbearia Ancorador com produtos premium', span: '' },
  { src: '/images/corte-classico-2.jpg', alt: 'Corte moderno masculino barbearia Lagoa da Conceição Floripa', span: '' },
  { src: '/images/corte-classico-3.jpg', alt: 'Barba alinhada na Barbearia Ancorador Florianópolis', span: '' },
]

export default function Gallery({ content }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-title', start: 'top 85%', once: true }
        }
      )

      gsap.fromTo('.gallery-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-masonry', start: 'top 80%', once: true }
        }
      )

      gsap.fromTo('.gallery-follow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-follow', start: 'top 90%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-20 md:py-28 lg:py-36"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="gallery-title text-3xl md:text-5xl uppercase tracking-[0.2em] mb-3 opacity-0"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            {content.gallery?.title || t('nav.gallery')}
          </h2>
          <p
            className="text-sm md:text-base"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
          >
            Momentos capturados na Ancorador
          </p>
        </div>

        {/* Desktop: Masonry grid */}
        <div className="gallery-masonry hidden md:grid grid-cols-3 lg:grid-cols-4 auto-rows-[180px] lg:auto-rows-[200px] gap-3">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-sm group cursor-pointer opacity-0 ${img.span}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gold glow on hover */}
              <div
                className="absolute inset-0 rounded-sm border-2 border-transparent transition-all duration-300 group-hover:border-[var(--color-primary)]"
                style={{ boxShadow: 'none' }}
              />
              <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 30px rgba(200, 164, 92, 0.15), 0 0 20px rgba(200, 164, 92, 0.1)' }}
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="gallery-masonry grid grid-cols-2 gap-3 md:hidden">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className="gallery-item relative overflow-hidden rounded-sm group opacity-0"
              whileTap={{ scale: 0.97 }}
            >
              <div className="aspect-square">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Follow link */}
        <div className="gallery-follow text-center mt-12 opacity-0">
          <motion.a
            href={`https://www.instagram.com/${content.business.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
            whileHover={{ y: -2 }}
          >
            <Instagram size={20} style={{ color: 'var(--color-primary)' }} />
            Siga @{content.business.instagram}
          </motion.a>
        </div>
      </div>
    </section>
  )
}
