// Logo oficial do Dr. David Amaral — imagem real do Instagram

export default function Logo({ size = 'md', variant = 'full', className = '' }) {
  const sizes = {
    sm: { h: 'h-8', text: 'text-sm' },
    md: { h: 'h-10', text: 'text-base' },
    lg: { h: 'h-14', text: 'text-xl' },
    xl: { h: 'h-20', text: 'text-2xl' },
  }

  const s = sizes[size] || sizes.md

  if (variant === 'icon') {
    return (
      <img
        src="/images/logo-drdavidamaral.jpg"
        alt="Dr. David Amaral — Ortopedia e Traumatologia"
        className={`${s.h} w-auto rounded-lg object-contain ${className}`}
        width="80"
        height="80"
      />
    )
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/images/logo-drdavidamaral.jpg"
        alt="Dr. David Amaral — Ortopedia e Traumatologia"
        className={`${s.h} w-auto rounded-lg object-contain`}
        width="80"
        height="80"
      />
      {variant === 'full' && size !== 'sm' && (
        <div className="flex flex-col leading-tight">
          <span className={`font-[family-name:var(--font-display)] font-bold tracking-tight ${s.text}`}>
            <span className="text-primary-dark">Dr. David</span>{' '}
            <span className="text-primary font-extrabold">Amaral</span>
          </span>
          <span className="text-[10px] md:text-xs text-text-muted uppercase tracking-[0.12em] font-medium">
            Ortopedia e Traumatologia
          </span>
        </div>
      )}
    </div>
  )
}
