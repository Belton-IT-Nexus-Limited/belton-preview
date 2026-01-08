import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps): JSX.Element {
  const { t } = useTranslation('navigation')
  const { isAU } = useRegion()
  const location = useLocation()
  const [openServices, setOpenServices] = useState(false)
  const [openClients, setOpenClients] = useState(false)
  const [openResources, setOpenResources] = useState(false)

  const basePath = isAU ? '/au' : ''

  const isActive = (path: string): boolean => {
    if (path === basePath || path === '/') {
      return location.pathname === basePath || location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  if (!isOpen) {
    return <></>
  }

  return (
    <div className="fixed inset-0 top-[70px] bg-[#1a1a2e] z-[99999] overflow-y-auto md:hidden">
      <div className="p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-6 text-white p-2"
          aria-label="Close menu"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <nav className="flex flex-col">
          <Link
            to={`${basePath}/how-we-work`}
            onClick={onClose}
            className={cn(
              'py-4 border-b border-white/10 text-white text-lg',
              isActive(`${basePath}/how-we-work`) && 'text-accent'
            )}
          >
            {t('howWeWork')}
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setOpenServices(!openServices)}
              className="w-full py-4 border-b border-white/10 text-white text-lg flex items-center justify-between"
            >
              {t('services')}
              <ChevronDownIcon
                className={cn('w-5 h-5 transition-transform', openServices && 'rotate-180')}
              />
            </button>
            {openServices && (
              <div className="bg-black/20 pl-4">
                <Link
                  to={`${basePath}/managed-it`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('servicesItems.managedIT')}
                </Link>
                <Link
                  to={`${basePath}/security`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('servicesItems.securityOperations')}
                </Link>
                <Link
                  to={`${basePath}/microsoft365`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('servicesItems.microsoft365')}
                </Link>
                <Link
                  to={`${basePath}/services`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  All Services
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setOpenClients(!openClients)}
              className="w-full py-4 border-b border-white/10 text-white text-lg flex items-center justify-between"
            >
              {t('clients')}
              <ChevronDownIcon
                className={cn('w-5 h-5 transition-transform', openClients && 'rotate-180')}
              />
            </button>
            {openClients && (
              <div className="bg-black/20 pl-4">
                <Link
                  to={`${basePath}/who-we-work-with`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('clientsItems.whoWeHelp')}
                </Link>
                <Link
                  to={`${basePath}/client-success`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('clientsItems.successStories')}
                </Link>
              </div>
            )}
          </div>

          <Link
            to={`${basePath}/about`}
            onClick={onClose}
            className={cn(
              'py-4 border-b border-white/10 text-white text-lg',
              isActive(`${basePath}/about`) && 'text-accent'
            )}
          >
            {t('about')}
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setOpenResources(!openResources)}
              className="w-full py-4 border-b border-white/10 text-white text-lg flex items-center justify-between"
            >
              {t('resources')}
              <ChevronDownIcon
                className={cn('w-5 h-5 transition-transform', openResources && 'rotate-180')}
              />
            </button>
            {openResources && (
              <div className="bg-black/20 pl-4">
                <Link
                  to={`${basePath}/diy-cybersecurity`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('resourcesItems.diyCybersecurity')}
                </Link>
                <Link
                  to={`${basePath}/essential-eight`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('resourcesItems.essentialEight')}
                </Link>
                <Link
                  to={`${basePath}/faq`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base"
                >
                  {t('resourcesItems.faq')}
                </Link>
              </div>
            )}
          </div>

          <Link
            to={`${basePath}/get-started`}
            onClick={onClose}
            className="py-4 border-b border-white/10 text-white text-lg"
          >
            Get Started
          </Link>

          <Link
            to={`${basePath}/contact`}
            onClick={onClose}
            className="py-4 text-white text-lg font-semibold"
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  )
}
