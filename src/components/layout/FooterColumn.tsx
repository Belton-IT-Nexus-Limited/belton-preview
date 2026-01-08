import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface FooterColumnProps {
  title: string
  children: ReactNode
  className?: string
}

export function FooterColumn({ title, children, className }: FooterColumnProps): JSX.Element {
  return (
    <div className={cn('flex flex-col', className)}>
      <h4 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-text-secondary mb-5">
        {title}
      </h4>
      {children}
    </div>
  )
}

interface FooterLinkProps {
  href: string
  children: ReactNode
  external?: boolean
}

export function FooterLink({ href, children, external = false }: FooterLinkProps): JSX.Element {
  const baseStyles = 'text-[0.9375rem] text-text-muted hover:text-text transition-colors mb-3'

  if (external || href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseStyles}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={baseStyles}>
      {children}
    </Link>
  )
}
