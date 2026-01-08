import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useRegion } from '@/hooks/useRegion'
import { type SEOData, siteConfig, getCanonicalUrl, getAlternateUrls } from '@/lib/seo'

interface SEOProps {
  data: SEOData
}

export function SEO({ data }: SEOProps): JSX.Element {
  const location = useLocation()
  const { isAU } = useRegion()

  const canonical = data.canonical || getCanonicalUrl(location.pathname, isAU)
  const ogImage = data.ogImage || `${siteConfig.siteUrl[isAU ? 'au' : 'nz']}${siteConfig.defaultImage}`
  const ogType = data.ogType || 'website'
  const alternates = getAlternateUrls(location.pathname)

  const fullTitle = data.title.includes(siteConfig.siteName)
    ? data.title
    : `${data.title} | ${siteConfig.siteName}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={canonical} />

      {data.noindex && <meta name="robots" content="noindex" />}
      {data.nofollow && <meta name="robots" content="nofollow" />}
      {!data.noindex && !data.nofollow && (
        <meta name="robots" content="index, follow" />
      )}

      <link rel="alternate" hrefLang="en-NZ" href={alternates.nz} />
      <link rel="alternate" hrefLang="en-AU" href={alternates.au} />
      <link rel="alternate" hrefLang="x-default" href={alternates.nz} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.siteName} />

      {siteConfig.twitterHandle && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={siteConfig.twitterHandle} />
          <meta name="twitter:title" content={fullTitle} />
          <meta name="twitter:description" content={data.description} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  )
}
