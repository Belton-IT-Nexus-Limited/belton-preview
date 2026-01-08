import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={textareaId} className="text-[0.8125rem] font-medium text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'bg-bg border border-border rounded-md px-4 py-3.5 text-[0.9375rem] text-text',
            'placeholder:text-text-muted min-h-[140px] resize-y',
            'focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15',
            'transition-all duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/15',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
