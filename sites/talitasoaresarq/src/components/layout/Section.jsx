export default function Section({ id, children, className = '', background = '', fullWidth = false, layout = 'block' }) {
  const layoutClass = {
    block: '',
    flex: 'flex flex-col',
    grid: 'grid',
  }[layout] || ''

  return (
    <section
      id={id}
      className={`overflow-hidden ${background} ${className}`}
      style={{ padding: '80px 32px' }}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={`mx-auto ${layoutClass}`} style={{ maxWidth: 'var(--max-width)' }}>
          {children}
        </div>
      )}
    </section>
  )
}
