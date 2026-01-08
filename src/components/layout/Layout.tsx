import { type ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { SkipLink } from '../ui/SkipLink'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1 pt-[137px] md:pt-[70px]" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
