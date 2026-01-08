import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps): JSX.Element {
  const { t } = useTranslation('navigation')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : ''

  const services = [
    {
      category: t('megaMenu.foundation'),
      items: [
        { key: 'managedIT', href: `${basePath}/managed-it` },
        { key: 'managedDevices', href: `${basePath}/endpoints` },
        { key: 'securityOperations', href: `${basePath}/security` },
        { key: 'networkSecurity', href: `${basePath}/network-security` }
      ]
    },
    {
      category: t('megaMenu.productivity'),
      items: [
        { key: 'microsoft365', href: `${basePath}/microsoft365` },
        { key: 'cloudSolutions', href: `${basePath}/cloud` },
        { key: 'connectivity', href: `${basePath}/connectivity` },
        { key: 'businessVoIP', href: `${basePath}/voice` }
      ]
    },
    {
      category: t('megaMenu.protection'),
      items: [
        { key: 'identityAccess', href: `${basePath}/identity` },
        { key: 'emailSecurity', href: `${basePath}/email-security` },
        { key: 'backupRecovery', href: `${basePath}/backup` }
      ]
    },
    {
      category: t('megaMenu.strategy'),
      items: [
        { key: 'compliance', href: `${basePath}/compliance` },
        { key: 'itAdvisory', href: `${basePath}/it-advisory` },
        { key: 'aiCopilot', href: `${basePath}/ai` },
        { key: 'projects', href: `${basePath}/projects` }
      ]
    }
  ]

  if (!isOpen) {
    return <></>
  }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-bg-elevated/98 border border-border rounded-lg p-6 min-w-[580px] opacity-0 invisible transition-all duration-200 pointer-events-none backdrop-blur-xl group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
      <div className="grid grid-cols-4 gap-6">
        {services.map((group) => (
          <div key={group.category}>
            <h4 className="text-[0.65rem] font-semibold uppercase tracking-wider text-accent mb-3">
              {group.category}
            </h4>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm text-text-secondary hover:text-text transition-colors whitespace-nowrap"
                >
                  {t(`servicesItems.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
