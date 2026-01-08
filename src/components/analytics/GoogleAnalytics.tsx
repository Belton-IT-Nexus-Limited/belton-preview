import { useEffect } from 'react'
import { initializeGA } from '@/lib/analytics'

export function GoogleAnalytics(): JSX.Element {
  useEffect(() => {
    initializeGA()
  }, [])

  return <></>
}
