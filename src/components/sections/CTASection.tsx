import { type ReactNode } from 'react'
import { ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { cn } from '@/lib/utils'

type CTAVariant = 'default' | 'red' | 'subtle'

interface CTASectionProps {
  title: string
  subtitle?: string
  primaryAction: {
    label: string
    href: string
    external?: boolean
  }
  secondaryAction?: {
    label: string
    href: string
    phone?: boolean
    external?: boolean
  }
  variant?: CTAVariant
  className?: string
}

const variantStyles: Record<CTAVariant, string> = {
  default: 'bg-bg-elevated',
  red: 'bg-gradient-to-b from-bg-elevated to-bg',
  subtle: 'bg-bg'
}

export function CTASection({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  variant = 'default',
  className
}: CTASectionProps): JSX.Element {
  return (
    <section className={cn('py-24 px-[5%] text-center relative overflow-hidden', variantStyles[variant], className)}>
      {variant === 'red' && (
        <div
          className="absolute top-[20%] -right-[10%] w-[50vmax] h-[50vmax] blur-[80px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(207, 29, 30, 0.08) 0%, transparent 60%)'
          }}
        />
      )}
      <Container className="relative z-10">
        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold mb-3">{title}</h2>
        {subtitle && (
          <p className="text-lg text-text-secondary max-w-[500px] mx-auto mb-8">{subtitle}</p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <Button as="link" to={primaryAction.href} external={primaryAction.external}>
            {primaryAction.label}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
          {secondaryAction && (
            <Button
              as="link"
              href={secondaryAction.href}
              variant="outline"
              external={secondaryAction.external}
            >
              {secondaryAction.phone && <PhoneIcon className="w-4 h-4" />}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}
