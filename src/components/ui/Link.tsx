import { type ReactNode } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface StyledLinkProps extends Omit<LinkProps, 'className'> {
  children: ReactNode
  showArrow?: boolean
  className?: string
  external?: boolean
}

export function StyledLink({
  children,
  showArrow = false,
  className,
  external = false,
  ...props
}: StyledLinkProps): JSX.Element {
  const baseStyles = 'text-text-secondary hover:text-text transition-colors duration-200 inline-flex items-center gap-2'

  const classes = cn(baseStyles, className)

  if (external || (typeof props.to === 'string' && props.to.startsWith('http'))) {
    return (
      <a
        href={props.to as string}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
        {showArrow && <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
      </a>
    )
  }

  return (
    <RouterLink className={classes} {...props}>
      {children}
      {showArrow && <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </RouterLink>
  )
}
