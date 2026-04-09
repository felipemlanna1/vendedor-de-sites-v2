import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import Button from '../ui/Button'
import { siteData } from '../../data/content'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappMsg = `${t('whatsapp.message')}%0A%0ANome: ${formState.name}%0AEmail: ${formState.email}%0AMensagem: ${formState.message}`
    window.open(`https://wa.me/5548999235973?text=${whatsappMsg}`, '_blank')
  }

  return (
    <Section id="contato" background="bg-[var(--color-surface)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--color-primary)] mb-4">
            {t('contact.label')}
          </p>
          <AnimatedText
            text={t('contact.title')}
            tag="h2"
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight mb-6"
          />
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-md">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <a
                href={siteData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group py-2 min-h-[44px]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors shrink-0">
                  <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">WhatsApp</p>
                  <p className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-primary)] transition-colors">
                    {t('contact.phone')}
                  </p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <a href={`mailto:${siteData.email}`} className="flex items-center gap-4 group py-2 min-h-[44px]">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors shrink-0">
                  <Mail className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Email</p>
                  <p className="text-base text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-primary)] transition-colors break-all">
                    {t('contact.email')}
                  </p>
                </div>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Local</p>
                  <p className="text-[var(--color-text-primary)] font-medium">
                    {t('contact.location')}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal direction="right" delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-[var(--color-background)] rounded-xl p-6 md:p-8 shadow-sm">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-secondary)]/40 bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-secondary)]/40 bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-secondary)]/40 bg-transparent text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                />
              </div>
              <Button variant="primary" className="w-full">
                {t('contact.form.submit')}
              </Button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </Section>
  )
}
