import { cn } from '@/lib/utils'

interface QuoteBlockProps {
  quote: string
  author: string
  className?: string
}

export function QuoteBlock({ quote, author, className }: QuoteBlockProps): JSX.Element {
  return (
    <div className={cn('border-l-4 border-accent pl-8 my-12 relative z-10', className)}>
      <p className="text-lg text-text-secondary leading-relaxed italic mb-4">{quote}</p>
      <cite className="text-sm text-text-muted not-italic">{author}</cite>
    </div>
  )
}
