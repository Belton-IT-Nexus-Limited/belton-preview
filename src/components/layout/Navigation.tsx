import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { MegaMenu } from './MegaMenu'
import { Button } from '../ui/Button'
import { cn } from '@/lib/utils'

export function Navigation(): JSX.Element {
  const { t } = useTranslation('navigation')
  const { isAU } = useRegion()
  const location = useLocation()
  const [openMegaMenu, setOpenMegaMenu] = useState(false)
  const [openClients, setOpenClients] = useState(false)
  const [openResources, setOpenResources] = useState(false)

  const basePath = isAU ? '/au' : ''

  const isActive = (path: string): boolean => {
    if (path === basePath || path === '/') {
      return location.pathname === basePath || location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleMegaMenuToggle = (open: boolean): void => {
    setOpenMegaMenu(open)
  }

  return (
    <nav className="flex items-center gap-8">
      <Link
        to={`${basePath}/how-we-work`}
        className={cn(
          'text-sm font-medium tracking-wide text-text-secondary hover:text-text transition-colors py-2',
          isActive(`${basePath}/how-we-work`) && 'text-text'
        )}
      >
        {t('howWeWork')}
      </Link>

      <div
        className="relative group"
        onMouseEnter={() => handleMegaMenuToggle(true)}
        onMouseLeave={() => handleMegaMenuToggle(false)}
      >
        <Link
          to={`${basePath}/services`}
          className={cn(
            'text-sm font-medium tracking-wide text-text-secondary hover:text-text transition-colors py-2 inline-flex items-center gap-1.5',
            isActive(`${basePath}/services`) && 'text-text'
          )}
        >
          {t('services')}
          <ChevronDownIcon className="w-2.5 h-2.5 opacity-50" />
        </Link>
        <MegaMenu isOpen={openMegaMenu} onClose={() => handleMegaMenuToggle(false)} />
      </div>

      <div className="relative group">
        <button
          type="button"
          className="text-sm font-medium tracking-wide text-text-secondary hover:text-text transition-colors py-2 inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded"
          onClick={() => setOpenClients(!openClients)}
          aria-expanded={openClients}
          aria-haspopup="true"
          aria-label={`${t('clients')} menu`}
        >
          {t('clients')}
          <ChevronDownIcon className="w-2.5 h-2.5 opacity-50" aria-hidden="true" />
        </button>
        {openClients && (
          <div
            role="menu"
            className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-bg-elevated/98 border border-border rounded-lg py-3 min-w-[180px] opacity-0 invisible transition-all duration-200 pointer-events-none backdrop-blur-xl group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
          >
            <Link
              to={`${basePath}/who-we-work-with`}
              onClick={() => setOpenClients(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
              role="menuitem"
            >
              {t('clientsItems.whoWeHelp')}
            </Link>
            <Link
              to={`${basePath}/client-success`}
              onClick={() => setOpenClients(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
              role="menuitem"
            >
              {t('clientsItems.successStories')}
            </Link>
          </div>
        )}
      </div>

      <Link
        to={`${basePath}/about`}
        className={cn(
          'text-sm font-medium tracking-wide text-text-secondary hover:text-text transition-colors py-2',
          isActive(`${basePath}/about`) && 'text-text'
        )}
      >
        {t('about')}
      </Link>

      <div className="relative group">
        <button
          type="button"
          className="text-sm font-medium tracking-wide text-text-secondary hover:text-text transition-colors py-2 inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded"
          onClick={() => setOpenResources(!openResources)}
          aria-expanded={openResources}
          aria-haspopup="true"
          aria-label={`${t('resources')} menu`}
        >
          {t('resources')}
          <ChevronDownIcon className="w-2.5 h-2.5 opacity-50" aria-hidden="true" />
        </button>
        {openResources && (
          <div
            role="menu"
            className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-bg-elevated/98 border border-border rounded-lg py-3 min-w-[180px] opacity-0 invisible transition-all duration-200 pointer-events-none backdrop-blur-xl group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
          >
            <Link
              to={`${basePath}/diy-cybersecurity`}
              onClick={() => setOpenResources(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap"
            >
              {t('resourcesItems.diyCybersecurity')}
            </Link>
            <Link
              to={`${basePath}/essential-eight`}
              onClick={() => setOpenResources(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap"
            >
              {t('resourcesItems.essentialEight')}
            </Link>
            <Link
              to={`${basePath}/m365-security-checklist`}
              onClick={() => setOpenResources(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap"
            >
              {t('resourcesItems.m365SecurityChecklist')}
            </Link>
            <Link
              to={`${basePath}/cyber-insurance-readiness`}
              onClick={() => setOpenResources(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap"
            >
              {t('resourcesItems.cyberInsuranceReadiness')}
            </Link>
            <Link
              to={`${basePath}/security-assessment`}
              onClick={() => setOpenResources(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap"
            >
              {t('resourcesItems.securityAssessment')}
            </Link>
            <Link
              to={`${basePath}/faq`}
              onClick={() => setOpenResources(false)}
              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-all whitespace-nowrap"
            >
              {t('resourcesItems.faq')}
            </Link>
          </div>
        )}
      </div>

      <Link
        to={`${basePath}/get-started`}
        className={cn(
          'text-sm font-medium tracking-wide text-text-secondary hover:text-text transition-colors py-2',
          isActive(`${basePath}/get-started`) && 'text-text'
        )}
      >
        Get Started
      </Link>

      <Button as="link" to={`${basePath}/contact`} size="sm" className="px-5 py-2.5">
        Contact
      </Button>
    </nav>
  )
}
