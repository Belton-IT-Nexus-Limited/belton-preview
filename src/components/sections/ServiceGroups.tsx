import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { StyledLink } from '../ui/Link'
import { Container } from '../ui/Container'
import { SectionTitle } from './SectionTitle'

interface ServiceGroupItem {
  key: string
  href: string
}

interface ServiceGroup {
  key: string
  title: string
  items: ServiceGroupItem[]
}

export function ServiceGroups(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : ''

  const groups: ServiceGroup[] = [
    {
      key: 'run',
      title: t('whatWeDo.groups.run.title'),
      items: [
        { key: 'managedIT', href: '/managed-it' },
        { key: 'deviceManagement', href: '/endpoints' },
        { key: 'microsoft365', href: '/microsoft365' },
        { key: 'cloudInfrastructure', href: '/cloud' }
      ]
    },
    {
      key: 'protect',
      title: t('whatWeDo.groups.protect.title'),
      items: [
        { key: 'securityOperations', href: '/security' },
        { key: 'identityAccess', href: '/identity' },
        { key: 'emailSecurity', href: '/email-security' },
        { key: 'backupRecovery', href: '/backup' }
      ]
    },
    {
      key: 'improve',
      title: t('whatWeDo.groups.improve.title'),
      items: [
        { key: 'itAdvisory', href: '/it-advisory' },
        { key: 'complianceGovernance', href: '/compliance' },
        { key: 'projectsMigrations', href: '/projects' },
        { key: 'aiReadiness', href: '/ai' }
      ]
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
                {group.items.map((item) => (
                  <li key={item.key} className="mb-3">
                    <StyledLink
                      to={`${basePath}${item.href}`}
                      showArrow
                      className="text-[0.9375rem] text-text-secondary group"
                    >
                      {t(`whatWeDo.groups.${group.key}.items.${item.key}`)}
                    </StyledLink>
                  </li>
                ))}
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
