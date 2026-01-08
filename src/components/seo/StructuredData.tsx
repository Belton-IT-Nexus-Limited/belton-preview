import { useLocation } from 'react-router-dom'
import { useRegion } from '@/hooks/useRegion'
import { useTranslation } from 'react-i18next'
import { siteConfig, getCanonicalUrl } from '@/lib/seo'

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'breadcrumb'
  breadcrumbs?: Array<{ name: string; url: string }>
  serviceName?: string
  serviceDescription?: string
}

export function StructuredData({
  type = 'organization',
  breadcrumbs,
  serviceName,
  serviceDescription
}: StructuredDataProps): JSX.Element {
  const location = useLocation()
  const { isAU } = useRegion()
  const { t } = useTranslation('common')

  const baseUrl = isAU ? siteConfig.siteUrl.au : siteConfig.siteUrl.nz
  const currentUrl = getCanonicalUrl(location.pathname, isAU)

  if (type === 'organization') {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: baseUrl,
      logo: `${baseUrl}/images/belton-logo-white-red.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: t('phone'),
        contactType: 'customer service',
        email: t('email'),
        areaServed: isAU ? 'AU' : 'NZ',
        availableLanguage: ['en']
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: isAU ? 'Mooroopna' : 'Auckland',
        addressCountry: isAU ? 'AU' : 'NZ'
      },
      sameAs: []
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    )
  }

  if (type === 'service' && serviceName && serviceDescription) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description: serviceDescription,
      provider: {
        '@type': 'Organization',
        name: siteConfig.siteName,
        url: baseUrl
      },
      areaServed: {
        '@type': 'Country',
        name: isAU ? 'Australia' : 'New Zealand'
      },
      url: currentUrl
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    )
  }

  if (type === 'breadcrumb' && breadcrumbs) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    )
  }

  return <></>
}
