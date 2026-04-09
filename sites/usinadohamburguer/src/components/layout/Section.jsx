export default function Section({ id, children, className = '', background = '', full = false }) {
  return (
    <section
      id={id}
      className={`px-5 py-16 md:px-8 md:py-24 lg:px-16 lg:py-28 ${background} ${className}`}
    >
      {full ? children : (
        <div className="mx-auto max-w-[var(--max-width)]">
          {children}
        </div>
      )}
    </section>
  )
}
