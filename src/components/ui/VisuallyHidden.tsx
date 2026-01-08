import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface VisuallyHiddenProps {
  children: ReactNode
  className?: string
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function VisuallyHidden({ children, className, as: Component = 'span' }: VisuallyHiddenProps): JSX.Element {
  return (
    <Component className={cn('sr-only', className)}>
      {children}
    </Component>
  )
}
