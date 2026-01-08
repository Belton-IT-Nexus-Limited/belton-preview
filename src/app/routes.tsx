import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { usePageTracking } from '@/hooks/usePageTracking'
import { Layout } from '@/components/layout'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const HomePage = lazy(() => import('@/pages/Home/HomePage').then((module) => ({ default: module.HomePage })))
const ServicesPage = lazy(() => import('@/pages/Services/ServicesPage').then((module) => ({ default: module.ServicesPage })))
const ContactPage = lazy(() => import('@/pages/Contact/ContactPage').then((module) => ({ default: module.ContactPage })))

interface RouteWrapperProps {
  children: React.ReactNode
}

function RouteWrapper({ children }: RouteWrapperProps): JSX.Element {
  const { region } = useRegion()
  const { i18n } = useTranslation()
  usePageTracking()

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
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<RouteWrapper><HomePage /></RouteWrapper>} />
        <Route path="/services" element={<RouteWrapper><ServicesPage /></RouteWrapper>} />
        <Route path="/contact" element={<RouteWrapper><ContactPage /></RouteWrapper>} />
        <Route path="/au" element={<RouteWrapper><HomePage /></RouteWrapper>} />
        <Route path="/au/services" element={<RouteWrapper><ServicesPage /></RouteWrapper>} />
        <Route path="/au/contact" element={<RouteWrapper><ContactPage /></RouteWrapper>} />
        <Route path="/au/*" element={<RouteWrapper><HomePage /></RouteWrapper>} />
      </Routes>
    </Suspense>
  )
}
