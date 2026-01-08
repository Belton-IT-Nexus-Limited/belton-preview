import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContainerSize = 'default' | 'narrow' | 'wide'

interface ContainerProps {
  children: ReactNode
  size?: ContainerSize
  className?: string
}

const sizeStyles: Record<ContainerSize, string> = {
  default: 'max-w-[1200px]',
  narrow: 'max-w-[800px]',
  wide: 'max-w-[1400px]'
}

export function Container({ children, size = 'default', className }: ContainerProps): JSX.Element {
  const baseStyles = 'mx-auto px-[5%] relative'

  const classes = cn(baseStyles, sizeStyles[size], className)

  return <div className={classes}>{children}</div>
}
