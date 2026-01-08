import { useEffect } from 'react'
import { initializeGA } from '@/lib/analytics'
import { CookieConsent } from './CookieConsent'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps): JSX.Element {
  useEffect(() => {
    const checkAndInitialize = (): void => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        initializeGA()
      } else {
        initializeGA()
      }
    }

    checkAndInitialize()

    const handleStorageChange = (): void => {
      checkAndInitialize()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <>
      {children}
      <CookieConsent />
    </>
  )
}
