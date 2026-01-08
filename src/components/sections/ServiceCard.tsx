import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Card } from '../ui/Card'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon?: ReactNode
  className?: string
}

export function ServiceCard({ title, description, href, icon, className }: ServiceCardProps): JSX.Element {
  return (
    <Card as="link" to={href} className={cn('group', className)}>
      {icon && (
        <div className="w-12 h-12 flex items-center justify-center bg-accent/10 rounded-lg mb-6 text-accent text-xl">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-[0.9375rem] text-text-secondary leading-relaxed mb-6">{description}</p>
      <span className="text-sm text-text-muted inline-flex items-center gap-2 group-hover:text-accent transition-colors">
        Learn more
        <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    </Card>
  )
}
