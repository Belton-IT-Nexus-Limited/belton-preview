import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'

export function usePageTracking(): void {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname + location.search
    const title = document.title || 'Belton IT Nexus'

    trackPageView(path, title)
  }, [location.pathname, location.search])
}
