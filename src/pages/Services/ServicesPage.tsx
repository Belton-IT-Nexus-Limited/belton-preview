import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { SEO } from '@/components/seo/SEO'
import { StructuredData } from '@/components/seo/StructuredData'
import { PageHeader } from '@/components/pages/PageHeader'
import { OptionBlock } from '@/components/pages/OptionBlock'
import { ServiceCategorySection } from '@/components/pages/ServiceCategorySection'
import { CTASection } from '@/components/sections/CTASection'
import { Container } from '@/components/ui/Container'
import { ProseBlock } from '@/components/sections/ProseBlock'
import { getCanonicalUrl } from '@/lib/seo'
import { useLocation } from 'react-router-dom'

export function ServicesPage(): JSX.Element {
  const { t } = useTranslation('pages/services')
  const { t: tCommon } = useTranslation('common')
  const { isAU } = useRegion()
  const location = useLocation()
  const basePath = isAU ? '/au' : ''

  const seoData = {
    title: isAU
      ? 'IT Services for Australian Business | Belton IT Nexus'
      : 'IT Services for New Zealand Business | Belton IT Nexus',
    description: t('intro'),
    canonical: getCanonicalUrl(location.pathname, isAU)
  }

  const breadcrumbs = [
    { name: tCommon('home'), url: getCanonicalUrl('/', isAU) },
    { name: t('title'), url: getCanonicalUrl(location.pathname, isAU) }
  ]

  const categories = [
    { key: 'foundation', label: t('categories.foundation') },
    { key: 'productivity', label: t('categories.productivity') },
    { key: 'protection', label: t('categories.protection') },
    { key: 'strategy', label: t('categories.strategy') }
  ]

  return (
    <>
      <SEO data={seoData} />
      <StructuredData type="breadcrumb" breadcrumbs={breadcrumbs} />
      <StructuredData
        type="service"
        serviceName={t('title')}
        serviceDescription={t('intro')}
      />
      <PageHeader
        breadcrumbs={[
          { label: tCommon('home'), href: '/' },
          { label: t('title') }
        ]}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <section className="py-16">
        <Container>
          <ProseBlock maxWidth="narrow" className="mb-12">
            <p className="text-lg text-text-secondary leading-relaxed">{t('intro')}</p>
          </ProseBlock>

          <div className="grid grid-cols-2 gap-6 mb-16 md:grid-cols-1">
            <OptionBlock
              label={t('options.complete.label')}
              title={t('options.complete.title')}
              description={t('options.complete.description')}
              href={`${basePath}/managed-it`}
              featured
            />
            <OptionBlock
              label={t('options.projects.label')}
              title={t('options.projects.title')}
              description={t('options.projects.description')}
              href={`${basePath}/projects`}
            />
          </div>
        </Container>
      </section>

      <section className="bg-bg-elevated py-16">
        <Container>
          {categories.map((category) => (
            <ServiceCategorySection
              key={category.key}
              category={category.key}
              categoryLabel={category.label}
            />
          ))}
        </Container>
      </section>

      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primaryAction={{
          label: t('cta.primary'),
          href: `${basePath}/contact`
        }}
        secondaryAction={{
          label: t('cta.secondary'),
          href: `${basePath}/how-we-work`
        }}
        variant="red"
      />
    </>
  )
}
