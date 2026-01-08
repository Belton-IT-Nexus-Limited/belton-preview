import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
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

  if (isAU) {
    return (
      <>
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
