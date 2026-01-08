import { type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
  className?: string
}

export function Image({ src, alt, loading = 'lazy', className, ...props }: ImageProps): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={cn('max-w-full h-auto', className)}
      {...props}
    />
  )
}
