import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { ServiceRow } from './ServiceRow'
import { Container } from '../ui/Container'
import { ProseBlock } from './ProseBlock'
import { SectionTitle } from './SectionTitle'

export function AUServicesSection(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  if (!isAU) {
    return <></>
  }

  const basePath = isAU ? '/au' : ''

  const services = [
    {
      key: 'managedIT',
      name: t('services.items.managedIT.name'),
      description: t('services.items.managedIT.description'),
      href: `${basePath}/managed-it`
    },
    {
      key: 'security',
      name: t('services.items.security.name'),
      description: t('services.items.security.description'),
      href: `${basePath}/security`
    },
    {
      key: 'microsoft365',
      name: t('services.items.microsoft365.name'),
      description: t('services.items.microsoft365.description'),
      href: `${basePath}/microsoft365`
    },
    {
      key: 'cloud',
      name: t('services.items.cloud.name'),
      description: t('services.items.cloud.description'),
      href: `${basePath}/cloud`
    }
  ]

  return (
    <section className="py-24 relative">
      <Container>
        <ProseBlock maxWidth="narrow">
          <SectionTitle title={t('services.title')} />
          <p className="text-lg text-text-secondary leading-relaxed mb-5">
            {t('services.intro1')}
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            {t('services.intro2')}
          </p>
        </ProseBlock>

        <div className="flex flex-col gap-px bg-border rounded-lg overflow-hidden max-w-[700px] mt-10">
          {services.map((service) => (
            <ServiceRow
              key={service.key}
              name={service.name}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
