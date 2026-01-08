import { cn } from '@/lib/utils'

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroupProps {
  label: string
  name: string
  options: CheckboxOption[]
  values: string[]
  onChange: (values: string[]) => void
  className?: string
}

export function CheckboxGroup({
  label,
  name,
  options,
  values,
  onChange,
  className
}: CheckboxGroupProps): JSX.Element {
  const handleChange = (value: string, checked: boolean): void => {
    if (checked) {
      onChange([...values, value])
    } else {
      onChange(values.filter((v) => v !== value))
    }
  }

  return (
    <div className={cn('mb-6', className)}>
      <label className="block text-[0.8125rem] font-medium text-text-secondary mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checkboxId = `${name}-${option.value}`
          const isChecked = values.includes(option.value)

          return (
            <label
              key={option.value}
              htmlFor={checkboxId}
              className={cn(
                'inline-block px-4 py-2 text-sm cursor-pointer transition-all duration-200',
                'bg-bg border border-border rounded-md',
                'hover:border-border-hover',
                isChecked
                  ? 'bg-surface-2 border-accent text-text'
                  : 'text-text-secondary'
              )}
            >
              <input
                type="checkbox"
                id={checkboxId}
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="sr-only"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}
