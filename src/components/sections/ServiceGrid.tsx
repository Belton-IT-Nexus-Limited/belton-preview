import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { getServicesByCategory } from '@/lib/data/services'
import { ServiceCard } from './ServiceCard'
import { Container } from '../ui/Container'
import { cn } from '@/lib/utils'

interface ServiceGridProps {
  categories?: string[]
  className?: string
}

export function ServiceGrid({ categories, className }: ServiceGridProps): JSX.Element {
  const { t } = useTranslation('navigation')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : ''

  const foundationServices = getServicesByCategory('foundation').slice(0, 4)
  const productivityServices = getServicesByCategory('productivity').slice(0, 4)
  const protectionServices = getServicesByCategory('protection').slice(0, 4)
  const strategyServices = getServicesByCategory('strategy').slice(0, 4)

  const allServices = [
    ...foundationServices,
    ...productivityServices,
    ...protectionServices,
    ...strategyServices
  ]

  const servicesToShow = categories
    ? allServices.filter((s) => categories.includes(s.category))
    : allServices

  return (
    <Container className={cn('py-20', className)}>
      <div className="grid grid-cols-4 gap-6 max-w-[1400px] mx-auto md:grid-cols-2 md:gap-4">
        {servicesToShow.map((service) => (
          <ServiceCard
            key={service.id}
            title={t(`servicesItems.${service.id.replace(/-/g, '')}`)}
            description={service.description}
            href={`${basePath}${service.href}`}
          />
        ))}
      </div>
    </Container>
  )
}
