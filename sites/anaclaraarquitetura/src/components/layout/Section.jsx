export default function Section({
  id,
  children,
  className = '',
  background = '',
  fullWidth = false,
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-20 md:px-8 md:py-24 lg:px-16 lg:py-32 overflow-hidden ${background} ${className}`}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="mx-auto max-w-[var(--max-width)]">{children}</div>
      )}
    </section>
  )
}
