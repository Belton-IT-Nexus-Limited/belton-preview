import { cn } from '@/lib/utils'

interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ label, title, subtitle, className }: SectionTitleProps): JSX.Element {
  return (
    <div className={cn('mb-10', className)}>
      {label && (
        <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
          {label}
        </div>
      )}
      <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-3 tracking-[-0.01em]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-text-secondary leading-relaxed max-w-[550px]">{subtitle}</p>
      )}
    </div>
  )
}
