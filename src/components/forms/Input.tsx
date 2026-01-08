import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-[0.8125rem] font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'bg-bg border border-border rounded-md px-4 py-3.5 text-[0.9375rem] text-text',
            'placeholder:text-text-muted',
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

Input.displayName = 'Input'
