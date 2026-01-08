import { type ReactNode } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import { trackOutboundLink } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface TrackedLinkProps extends Omit<LinkProps, 'to'> {
  to?: string
  href?: string
  children: ReactNode
  className?: string
  external?: boolean
}

export function TrackedLink({
  to,
  href,
  children,
  className,
  external,
  ...props
}: TrackedLinkProps): JSX.Element {
  const handleClick = (): void => {
    if (external && href) {
      trackOutboundLink(href, typeof children === 'string' ? children : undefined)
    }
  }

  if (to) {
    return (
      <RouterLink to={to} className={cn(className)} onClick={handleClick} {...props}>
        {children}
      </RouterLink>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(className)}
        onClick={handleClick}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </a>
    )
  }

  return (
    <a className={cn(className)} onClick={handleClick} {...(props as Record<string, unknown>)}>
      {children}
    </a>
  )
}
