import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { Layout } from '@/components/layout'

interface RouteWrapperProps {
  children: React.ReactNode
}

function RouteWrapper({ children }: RouteWrapperProps): JSX.Element {
  const { region } = useRegion()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== region) {
      i18n.changeLanguage(region).catch(() => {
        // Ignore language change errors
      })
    }
  }, [region, i18n])

  return <Layout>{children}</Layout>
}

function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-bg text-text p-8">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="text-text-secondary">i18n routing placeholder</p>
    </div>
  )
}

function AUHomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-bg text-text p-8">
      <h1 className="text-4xl font-bold mb-4">AU Home Page</h1>
      <p className="text-text-secondary">i18n routing placeholder</p>
    </div>
  )
}

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<RouteWrapper><HomePage /></RouteWrapper>} />
      <Route path="/au" element={<RouteWrapper><AUHomePage /></RouteWrapper>} />
      <Route path="/au/*" element={<RouteWrapper><AUHomePage /></RouteWrapper>} />
    </Routes>
  )
}
