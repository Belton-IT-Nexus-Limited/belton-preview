import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'default' | 'sm' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  as?: 'button'
  children: ReactNode
}

interface ButtonLinkProps extends BaseButtonProps, Omit<LinkProps, 'className' | 'children'> {
  as: 'link'
  children: ReactNode
  external?: boolean
  href?: string
}

type ButtonComponentProps = ButtonProps | ButtonLinkProps

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-red text-white hover:bg-[#b81a1a] hover:-translate-y-px',
  secondary: 'bg-surface border border-border text-text hover:bg-surface-2 hover:border-text-secondary hover:-translate-y-px',
  outline: 'bg-black/50 border border-border text-text backdrop-blur-sm hover:border-text-secondary hover:bg-white/10'
}

const sizeStyles: Record<ButtonSize, string> = {
  default: 'px-7 py-4 text-[0.9375rem]',
  sm: 'px-4 py-2 text-[0.8125rem]',
  lg: 'px-8 py-[1.125rem] text-base'
}

export function Button(props: ButtonComponentProps): JSX.Element {
  const { variant = 'primary', size = 'default', children, className, ...rest } = props

  const baseStyles = 'inline-flex items-center gap-2.5 rounded font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg'

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (props.as === 'link') {
    const { as, external, href, to, children: linkChildren, ...linkProps } = props
    const linkHref = href || to

    if (external || (typeof linkHref === 'string' && (linkHref.startsWith('http') || linkHref.startsWith('tel:') || linkHref.startsWith('mailto:')))) {
      return (
        <a
          href={typeof linkHref === 'string' ? linkHref : '#'}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...(linkProps as Record<string, unknown>)}
        >
          {linkChildren}
        </a>
      )
    }

    return (
      <Link className={classes} to={to || '/'} {...linkProps}>
        {linkChildren}
      </Link>
    )
  }

  return (
    <button className={classes} type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
