import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { initializeGA } from '@/lib/analytics'
import { Button } from '../ui/Button'
import { cn } from '@/lib/utils'

const CONSENT_KEY = 'belton-analytics-consent'
const CONSENT_EXPIRY_DAYS = 365

interface ConsentState {
  accepted: boolean
  timestamp: number
}

export function CookieConsent(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const checkConsent = (): void => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY)
        if (!stored) {
          setIsVisible(true)
          setIsAnimating(true)
          return
        }

        const consent: ConsentState = JSON.parse(stored)
        const now = Date.now()
        const expiry = consent.timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000

        if (now > expiry) {
          setIsVisible(true)
          setIsAnimating(true)
        }
      } catch {
        setIsVisible(true)
        setIsAnimating(true)
      }
    }

    checkConsent()
  }, [])

  const handleAccept = (): void => {
    try {
      const consent: ConsentState = {
        accepted: true,
        timestamp: Date.now()
      }
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
      initializeGA()
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    } catch {
      setIsVisible(false)
    }
  }

  const handleDecline = (): void => {
    try {
      const consent: ConsentState = {
        accepted: false,
        timestamp: Date.now()
      }
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), 300)
    } catch {
      setIsVisible(false)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[10000] bg-bg-elevated border-t border-border p-6 shadow-lg',
        'transform transition-transform duration-300',
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto max-w-4xl flex items-start gap-4 md:flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            We use Google Analytics to understand how visitors interact with our website. This helps us improve our
            services and user experience. You can choose to accept or decline analytics cookies.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 md:w-full md:justify-end">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button variant="primary" size="sm" onClick={handleAccept}>
            Accept
          </Button>
          <button
            type="button"
            onClick={handleDecline}
            className="p-1 text-text-muted hover:text-text transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
