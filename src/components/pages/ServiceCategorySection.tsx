import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { getServicesByCategory } from '@/lib/data/services'
import { ServiceRow } from '../sections/ServiceRow'
import { cn } from '@/lib/utils'

interface ServiceCategorySectionProps {
  category: string
  categoryLabel: string
  className?: string
}

export function ServiceCategorySection({
  category,
  categoryLabel,
  className
}: ServiceCategorySectionProps): JSX.Element {
  const { t } = useTranslation('navigation')
  const { isAU } = useRegion()
  const basePath = isAU ? '/au' : ''

  const services = getServicesByCategory(category)

  return (
    <div className={cn('mb-12 last:mb-0', className)}>
      <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-6">{categoryLabel}</div>
      <div className="flex flex-col gap-px bg-border rounded-lg overflow-hidden">
        {services.map((service) => {
          const serviceKey = service.id.replace(/-/g, '')
          const translatedName = t(`servicesItems.${serviceKey}`, { defaultValue: service.name })
          return (
            <ServiceRow
              key={service.id}
              name={translatedName}
              description={service.description}
              href={`${basePath}${service.href}`}
            />
          )
        })}
      </div>
    </div>
  )
}
