import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { SEO } from '@/components/seo/SEO'
import { StructuredData } from '@/components/seo/StructuredData'
import { Hero } from '@/components/sections/Hero'
import { StatsBar } from '@/components/sections/StatsBar'
import { ClientTypes } from '@/components/sections/ClientTypes'
import { ServiceGroups } from '@/components/sections/ServiceGroups'
import { HowWeWorkPreview } from '@/components/sections/HowWeWorkPreview'
import { TrustSection } from '@/components/sections/TrustSection'
import { AUServicesSection } from '@/components/sections/AUServicesSection'
import { AUApproachSection } from '@/components/sections/AUApproachSection'
import { AUTestimonialSection } from '@/components/sections/AUTestimonialSection'
import { AUBeyondSection } from '@/components/sections/AUBeyondSection'
import { CTASection } from '@/components/sections/CTASection'

export function HomePage(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { t: tCommon } = useTranslation('common')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : ''

  const seoData = {
    title: isAU
      ? 'Managed IT & Cybersecurity for Australian Business | Belton IT Nexus'
      : 'Managed IT & Security for New Zealand Business | Belton IT Nexus',
    description: isAU
      ? 'Secure IT for growing Australian business. Managed IT, security operations, Microsoft 365, and cloud solutions from a Sydney team who actually pick up the phone.'
      : 'Reliable, secure IT without the complexity. We help organisations run well-governed technology environments with clear ownership and predictable costs.'
  }

  if (isAU) {
    return (
      <>
        <SEO data={seoData} />
        <StructuredData type="organization" />
        <Hero />
        <StatsBar />
        <AUServicesSection />
        <AUApproachSection />
        <AUTestimonialSection />
        <AUBeyondSection />
        <CTASection
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          primaryAction={{
            label: t('cta.button'),
            href: `${basePath}/contact`
          }}
          secondaryAction={{
            label: t('cta.phone'),
            href: `tel:${tCommon('phone')}`,
            phone: true
          }}
          variant="red"
        />
      </>
    )
  }

  return (
    <>
      <SEO data={seoData} />
      <StructuredData type="organization" />
      <Hero />
      <ClientTypes />
      <ServiceGroups />
      <HowWeWorkPreview />
      <TrustSection />
      <CTASection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
        primaryAction={{
          label: t('cta.button'),
          href: `${basePath}/contact`
        }}
      />
    </>
  )
}
