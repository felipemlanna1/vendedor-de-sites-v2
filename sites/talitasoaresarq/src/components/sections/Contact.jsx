import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Instagram, Facebook, MapPin, MessageCircle } from 'lucide-react'
import Section from '../layout/Section'
import Button from '../ui/Button'
import { siteData } from '../../data/content'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(`Ol\u00e1 Talita! Meu nome \u00e9 ${formData.name}. ${formData.message}`)
    window.open(`${siteData.contact.whatsappUrl}?text=${msg}`, '_blank')
  }

  return (
    <Section id="contact" background="bg-[var(--carvao)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left — Form */}
        <motion.div
          initial={{ opacity: 0.35, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--marfim)] mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-[var(--pergaminho)]/70 mb-8 leading-relaxed">
            {t('contact.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-[var(--pergaminho)]/60 text-sm mb-1.5">
                {t('contact.name_label')}
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[var(--carvao)] border border-[var(--pergaminho)]/20 text-[var(--marfim)] px-4 py-3 rounded-sm focus:border-[var(--terracota)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[var(--pergaminho)]/60 text-sm mb-1.5">
                {t('contact.email_label')}
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[var(--carvao)] border border-[var(--pergaminho)]/20 text-[var(--marfim)] px-4 py-3 rounded-sm focus:border-[var(--terracota)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[var(--pergaminho)]/60 text-sm mb-1.5">
                {t('contact.message_label')}
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[var(--carvao)] border border-[var(--pergaminho)]/20 text-[var(--marfim)] px-4 py-3 rounded-sm focus:border-[var(--terracota)] focus:outline-none transition-colors resize-none"
              />
            </div>
            <Button className="w-full justify-center">{t('contact.submit')}</Button>
          </form>
        </motion.div>

        {/* Right — Image + Contact info */}
        <motion.div
          initial={{ opacity: 0.35, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <img
            src={siteData.images.contact}
            alt="Ambiente de interiores moderno projetado com elegancia e funcionalidade"
            className="w-full aspect-[3/2] object-cover rounded-sm"
            loading="eager"
            width="640"
            height="427"
          />
          {/* Glassmorphism overlay card */}
          <div className="absolute bottom-6 left-6 right-6 bg-[var(--carvao)]/70 backdrop-blur-md border border-white/10 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin size={18} className="text-[var(--terracota)]" />
              <span className="text-[var(--marfim)] text-sm">{t('contact.location')}</span>
            </div>
            <a
              href={siteData.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mb-4 text-[var(--marfim)] hover:text-[var(--terracota)] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} className="text-[var(--terracota)]" />
              <span className="text-sm">{siteData.contact.whatsappDisplay}</span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href={siteData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--pergaminho)]/60 hover:text-[var(--terracota)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageCircle size={22} />
              </a>
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--pergaminho)]/60 hover:text-[var(--terracota)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--pergaminho)]/60 hover:text-[var(--terracota)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
