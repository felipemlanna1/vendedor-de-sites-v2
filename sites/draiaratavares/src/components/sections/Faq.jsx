import { useTranslation } from 'react-i18next'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import AnimatedText from '../ui/AnimatedText'
import FaqSchema from '../seo/FaqSchema'
import { siteData } from '../../data/content'

export default function Faq() {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-[var(--space-section)] md:px-8 lg:px-16 bg-[var(--color-surface)]">
      <FaqSchema />
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10 md:mb-14">
          <AnimatedText
            text="FAQ"
            tag="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-text-primary)]"
          />
        </div>

        <ScrollReveal>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {siteData.faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`faq-${i}`}
                className="bg-[var(--color-background)] rounded-[var(--radius-md)] border border-[var(--color-border-light)] overflow-hidden"
              >
                <Accordion.Trigger className="group flex items-center justify-between w-full px-5 py-4 md:px-6 md:py-5 text-left cursor-pointer">
                  <span className="font-body text-sm md:text-base font-medium text-[var(--color-text-primary)] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-[var(--color-text-muted)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="px-5 pb-4 md:px-6 md:pb-5">
                    <p className="font-body text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </ScrollReveal>
      </div>
    </section>
  )
}
