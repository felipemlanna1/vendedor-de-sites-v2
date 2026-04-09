export default function Section({ id, children, className = '', background = '' }) {
  return (
    <section
      id={id}
      className={`px-5 py-20 md:px-8 md:py-24 lg:px-16 lg:py-32 overflow-hidden ${background} ${className}`}
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        {children}
      </div>
    </section>
  )
}
