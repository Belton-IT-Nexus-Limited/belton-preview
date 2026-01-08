import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LiveRegionProps {
  children: ReactNode
  level?: 'polite' | 'assertive' | 'off'
  className?: string
}

export function LiveRegion({ children, level = 'polite', className }: LiveRegionProps): JSX.Element {
  return (
    <div
      role="status"
      aria-live={level}
      aria-atomic="true"
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  )
}
