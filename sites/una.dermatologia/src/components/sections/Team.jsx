import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import Section from '../layout/Section'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import { team } from '../../data/content'
import { User, ChevronDown, ChevronUp } from 'lucide-react'

function TeamCard({ member, index }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const roleKey = {
    'Responsavel Tecnica': 'role_rt',
    'Dermatologista': 'role_dermatologist',
    'Radiologista': 'role_radiologist',
    'Enfermeira': 'role_nurse',
  }

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        layout
        className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border-light)] hover:border-[var(--color-secondary)]/30 transition-colors"
      >
        {/* Top section */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                loading="lazy"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-primary)]/[0.08] flex items-center justify-center flex-shrink-0">
                <User size={28} className="text-[var(--color-primary)]/60" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-[var(--color-secondary)] mt-1">
                {t(`team.${roleKey[member.role] || 'role_dermatologist'}`)}
              </p>
              {(member.crm || member.coren) && (
                <p className="text-sm text-[var(--color-text-muted)] mt-1 font-mono">
                  {member.crm || ''} {member.rqe ? `| ${member.rqe}` : ''} {member.coren || ''}
                </p>
              )}
            </div>
          </div>

          {/* Expand toggle */}
          {(member.credentials?.length > 0 || member.formation) && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 flex items-center gap-1.5 text-base text-[var(--color-primary)] font-medium cursor-pointer hover:text-[var(--color-primary-dark)] transition-colors px-4 py-3 -mx-4 rounded-lg hover:bg-[var(--color-primary)]/[0.04] min-h-[44px]"
            >
              {expanded ? t('team.credentials') : t('team.credentials')}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-[var(--color-border-light)] pt-5 space-y-4">
                {member.formation && (
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-medium mb-1">
                      {t('team.formation')}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{member.formation}</p>
                  </div>
                )}
                {member.credentials?.length > 0 && (
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-medium mb-2">
                      {t('team.credentials')}
                    </p>
                    <ul className="space-y-1">
                      {member.credentials.map((cred, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[var(--color-secondary)] mt-2 flex-shrink-0" />
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {member.areas?.length > 0 && (
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-medium mb-2">
                      {t('team.areas')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.areas.map((area, i) => (
                        <span
                          key={i}
                          className="text-sm px-3 py-1.5 rounded-full bg-[var(--color-primary)]/[0.06] text-[var(--color-primary)] font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Team() {
  const { t } = useTranslation()

  return (
    <Section id="team" background="bg-[var(--color-background)]">
      <ScrollReveal>
        <p className="text-base font-medium uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-4">
          {t('team.label')}
        </p>
      </ScrollReveal>

      <AnimatedText
        text={t('team.title')}
        tag="h2"
        className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[var(--color-text-primary)]"
      />

      <ScrollReveal delay={0.1}>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-[60ch]">
          {t('team.subtitle')}
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member, i) => (
          <TeamCard key={member.id} member={member} index={i} />
        ))}
      </div>
    </Section>
  )
}
