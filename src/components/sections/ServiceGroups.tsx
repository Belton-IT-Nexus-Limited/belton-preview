import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { getServicesByCategory } from '@/lib/data/services'
import { StyledLink } from '../ui/Link'
import { Container } from '../ui/Container'
import { SectionTitle } from './SectionTitle'
import { cn } from '@/lib/utils'

export function ServiceGroups(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : ''

  const groups = [
    {
      key: 'run',
      title: t('whatWeDo.groups.run.title'),
      services: getServicesByCategory('foundation').slice(0, 4).concat(
        getServicesByCategory('productivity').slice(0, 1)
      )
    },
    {
      key: 'protect',
      title: t('whatWeDo.groups.protect.title'),
      services: getServicesByCategory('protection')
    },
    {
      key: 'improve',
      title: t('whatWeDo.groups.improve.title'),
      services: getServicesByCategory('strategy').slice(0, 4)
    }
  ]

  return (
    <section className="bg-bg-elevated py-24">
      <Container>
        <SectionTitle
          label={t('whatWeDo.label')}
          title={t('whatWeDo.title')}
          subtitle={t('whatWeDo.intro')}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mt-8">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="text-lg font-semibold mb-4 pb-3 border-b-2 border-accent">
                {group.title}
              </h3>
              <ul className="list-none p-0 m-0">
                {group.services.map((service) => {
                  const serviceKey = service.id.replace(/-/g, '')
                  return (
                    <li key={service.id} className="mb-3">
                      <StyledLink
                        to={`${basePath}${service.href}`}
                        showArrow
                        className="text-[0.9375rem] text-text-secondary group"
                      >
                        {t(`whatWeDo.groups.${group.key}.items.${serviceKey}`)}
                      </StyledLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <StyledLink
          to={`${basePath}/services`}
          showArrow
          className="mt-6 text-[0.9375rem] font-medium text-accent"
        >
          {t('whatWeDo.viewAll')}
        </StyledLink>
      </Container>
    </section>
  )
}
