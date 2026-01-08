import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Card } from '../ui/Card'
import { cn } from '@/lib/utils'

interface OptionBlockProps {
  label: string
  title: string
  description: string
  href: string
  featured?: boolean
  className?: string
}

export function OptionBlock({
  label,
  title,
  description,
  href,
  featured = false,
  className
}: OptionBlockProps): JSX.Element {
  return (
    <Card
      as="link"
      to={href}
      hover={true}
      className={cn(
        'group relative overflow-hidden',
        featured && 'border-2 border-accent bg-surface-2',
        className
      )}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-accent text-bg px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          {label}
        </div>
      )}
      {!featured && (
        <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{label}</div>
      )}
      <h3 className={cn('text-xl font-bold mb-3', featured && 'mt-6')}>{title}</h3>
      <p className="text-[0.9375rem] text-text-secondary leading-relaxed mb-6">{description}</p>
      <span className="text-sm text-text-muted inline-flex items-center gap-2 group-hover:text-accent transition-colors">
        {featured ? 'Learn more' : 'Discuss a project'}
        <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    </Card>
  )
}
