import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FraseImpacto() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word')
      if (words?.length) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(words,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            )
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const text = t('frase.texto')
  const words = text.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-primary-dark bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 md:px-8 lg:px-16 text-center">
        <p
          ref={textRef}
          className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.2em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
