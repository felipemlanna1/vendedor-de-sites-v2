export default function Section({
  id,
  children,
  className = '',
  background = '',
}) {
  return (
    <section
      id={id}
      className={`px-5 py-[var(--space-section)] md:px-8 lg:px-16 ${background} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
