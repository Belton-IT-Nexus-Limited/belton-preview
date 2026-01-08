import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface ServiceRowProps {
  name: string
  description: string
  href: string
  className?: string
}

export function ServiceRow({ name, description, href, className }: ServiceRowProps): JSX.Element {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-6 px-6 py-5 bg-surface hover:bg-surface-2 transition-colors group',
        className
      )}
    >
      <div className="flex-1">
        <span className="font-semibold text-[0.9375rem] text-text block mb-1 min-w-[180px]">
          {name}
        </span>
        <span className="text-sm text-text-secondary">{description}</span>
      </div>
      <ArrowRightIcon className="w-3 h-3 text-text-muted group-hover:text-accent transition-colors" />
    </Link>
  )
}
