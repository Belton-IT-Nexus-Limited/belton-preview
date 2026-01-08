import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { Layout } from '@/components/layout'
import { HomePage } from '@/pages/Home/HomePage'

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

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<RouteWrapper><HomePage /></RouteWrapper>} />
      <Route path="/au" element={<RouteWrapper><HomePage /></RouteWrapper>} />
      <Route path="/au/*" element={<RouteWrapper><HomePage /></RouteWrapper>} />
    </Routes>
  )
}
