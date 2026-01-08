import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ProseBlockProps {
  children: ReactNode
  className?: string
  maxWidth?: 'default' | 'narrow' | 'wide'
}

const maxWidthStyles = {
  default: 'max-w-[720px]',
  narrow: 'max-w-[680px]',
  wide: 'max-w-[800px]'
}

export function ProseBlock({ children, className, maxWidth = 'default' }: ProseBlockProps): JSX.Element {
  return (
    <div className={cn('relative z-10', maxWidthStyles[maxWidth], className)}>
      {children}
    </div>
  )
}
