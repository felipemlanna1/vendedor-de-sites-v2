import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { MessageCircle } from 'lucide-react'

export default function Hero() {
  const { t } = useTranslation()

  const badges = [
    t('hero.badge1'),
    t('hero.badge2'),
    t('hero.badge3'),
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-6 pt-20 pb-32 md:px-8 lg:px-16"
      style={{
        backgroundColor: 'var(--color-primary-dark)',
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, var(--color-primary) 0%, var(--color-primary-dark) 70%)',
        }}
      />

      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-16 right-0 w-64 md:w-96 h-64 md:h-96 rounded-full"
          style={{ background: 'var(--color-secondary)', opacity: 0.08 }}
        />
        <div
          className="absolute bottom-32 left-0 w-48 md:w-72 h-48 md:h-72 rounded-full"
          style={{ background: 'var(--color-accent)', opacity: 0.06 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--max-width)] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: text content */}
        <div className="text-center lg:text-left">
          {/* Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 md:mb-10">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 text-white backdrop-blur-sm border border-white/20"
              >
                {badge}
              </motion.span>
            ))}
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('hero.title').split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-6 md:mt-8 text-lg md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-8 md:mt-10"
          >
            <Button
              href={siteData.whatsappLink}
              variant="accent"
              className="text-lg px-10 py-4 shadow-lg"
            >
              <MessageCircle size={20} />
              {t('hero.cta')}
            </Button>
          </motion.div>
        </div>

        {/* Right: professional photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative">
            {/* Decorative ring */}
            <div
              className="absolute -inset-4 rounded-full"
              style={{
                background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 50%, var(--color-primary-light) 100%)',
                opacity: 0.3,
              }}
            />
            <img
              src="/images/dra-marcia-profissional.jpg"
              alt="Profa. Dra. Marcia Oliveira - Odontopediatra"
              className="relative z-10 w-80 h-80 xl:w-96 xl:h-96 object-cover object-top rounded-full shadow-2xl border-4 border-white/20"
              width={384}
              height={384}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade - starts well below text content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-background), transparent)' }}
      />
    </section>
  )
}
