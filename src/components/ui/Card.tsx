import { type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface BaseCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

interface CardProps extends BaseCardProps {
  as?: 'div'
}

interface CardLinkProps extends BaseCardProps, Omit<LinkProps, 'className' | 'children'> {
  as: 'link'
}

type CardComponentProps = CardProps | CardLinkProps

export function Card(props: CardComponentProps): JSX.Element {
  const { children, className, hover = true, ...rest } = props

  const baseStyles = 'bg-surface border border-border rounded-xl p-8 transition-all duration-300 relative overflow-hidden'

  const hoverStyles = hover
    ? 'hover:border-border-hover hover:bg-surface-2 hover:-translate-y-1'
    : ''

  const classes = cn(baseStyles, hoverStyles, className)

  if (props.as === 'link') {
    const { as: _as, ...linkProps } = props
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  return (
    <div className={classes} {...(rest as Record<string, unknown>)}>
      {children}
    </div>
  )
}
