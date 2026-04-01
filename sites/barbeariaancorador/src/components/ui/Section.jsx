export default function Section({ id, children, className = '', dark = false }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${dark ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-background)]'} ${className}`}
      style={{ padding: 'var(--section-padding-mobile)' }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: 'var(--max-width)' }}>
        {children}
      </div>
    </section>
  )
}
