import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { image: '/images/navalha-ritual.jpg', alt: 'Ritual da navalha na barbearia clássica' },
  { image: '/images/sucata-tradicao.jpg', alt: 'Sucata barbeiro clássico com cliente' },
  { image: '/images/conexao-genuina.webp', alt: 'Conexão genuína na Barbearia Ancorador' },
]

export default function Lifestyle() {
  const { t } = useTranslation()
  const BLOCKS = [
    { label: t('lifestyle.block1Label'), title: t('lifestyle.block1Title'), description: t('lifestyle.block1Desc'), ...IMAGES[0] },
    { label: t('lifestyle.block2Label'), title: t('lifestyle.block2Title'), description: t('lifestyle.block2Desc'), ...IMAGES[1] },
    { label: t('lifestyle.block3Label'), title: t('lifestyle.block3Title'), description: t('lifestyle.block3Desc'), ...IMAGES[2] },
  ]
  const sectionRef = useRef(null)
  const imageRefs = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Section title
      gsap.fromTo('.lifestyle-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.lifestyle-title', start: 'top 85%', once: true }
        }
      )

      // Each block reveal with stagger
      document.querySelectorAll('.lifestyle-block').forEach((block, i) => {
        const textEl = block.querySelector('.lifestyle-text')
        const imageEl = block.querySelector('.lifestyle-image')

        gsap.fromTo(textEl,
          { opacity: 0, x: i % 2 === 0 ? 40 : -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 75%', once: true }
          }
        )

        gsap.fromTo(imageEl,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 75%', once: true }
          }
        )
      })

      // Parallax on images
      imageRefs.current.forEach((img) => {
        if (!img) return
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32"
      style={{ background: 'var(--color-background)' }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Section title */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className="lifestyle-title block text-xs uppercase tracking-[0.3em] mb-3 opacity-0"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-muted)' }}
          >
            {t('lifestyle.sectionTitle')}
          </span>
          <div
            className="w-12 h-px mx-auto opacity-0 lifestyle-title"
            style={{ background: 'var(--color-primary)' }}
          />
        </div>

        {/* Alternating blocks */}
        <div className="space-y-20 md:space-y-28">
          {BLOCKS.map((block, i) => {
            const isReversed = i % 2 !== 0

            return (
              <div
                key={i}
                className={`lifestyle-block grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div
                  className={`lifestyle-image relative overflow-hidden rounded-sm aspect-[4/5] md:aspect-[3/4] opacity-0 ${
                    isReversed ? 'md:order-2' : ''
                  }`}
                >
                  <img
                    ref={(el) => (imageRefs.current[i] = el)}
                    src={block.image}
                    alt={block.alt}
                    className="w-full h-[120%] object-cover"
                    loading="lazy"
                  />
                  {/* Subtle gold gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(10, 10, 10, 0.4) 0%, transparent 40%)',
                    }}
                  />
                </div>

                {/* Text */}
                <div
                  className={`lifestyle-text opacity-0 ${
                    isReversed ? 'md:order-1 md:text-right' : ''
                  }`}
                >
                  <span
                    className="block text-xs uppercase tracking-[0.25em] mb-4"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                  >
                    {block.label}
                  </span>

                  <h3
                    className="text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.1em] mb-6"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
                  >
                    {block.title}
                  </h3>

                  <p
                    className="text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                  >
                    {block.description}
                  </p>

                  {/* Decorative line */}
                  <div
                    className={`w-12 h-px mt-6 ${isReversed ? 'md:ml-auto' : ''}`}
                    style={{ background: 'var(--color-primary)', opacity: 0.4 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
