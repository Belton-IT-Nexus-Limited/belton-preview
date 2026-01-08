import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
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
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const basePath = isAU ? '/au' : ''

  const isActive = (path: string): boolean => {
    if (path === basePath || path === '/') {
      return location.pathname === basePath || location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const containerRef = useFocusTrap({ isActive: isOpen, initialFocus: closeButtonRef.current })
  useKeyboardNavigation({ onEscape: onClose, isActive: isOpen })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) {
    return <></>
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="fixed inset-0 top-[70px] bg-[#1a1a2e] z-[99999] overflow-y-auto md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation menu"
      id="mobile-navigation"
    >
      <div className="p-8">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-5 right-6 text-white p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1a2e] rounded"
          aria-label="Close navigation menu"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <nav className="flex flex-col" aria-label="Main navigation">
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
              className="w-full py-4 border-b border-white/10 text-white text-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1a2e]"
              aria-expanded={openServices}
              aria-controls="mobile-services-menu"
            >
              {t('services')}
              <ChevronDownIcon
                className={cn('w-5 h-5 transition-transform', openServices && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {openServices && (
              <div id="mobile-services-menu" className="bg-black/20 pl-4" role="menu">
                <Link
                  to={`${basePath}/managed-it`}
                  onClick={onClose}
                  className="block py-3 text-white/80 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black/20"
                  role="menuitem"
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
              className="w-full py-4 border-b border-white/10 text-white text-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1a2e]"
              aria-expanded={openClients}
              aria-controls="mobile-clients-menu"
            >
              {t('clients')}
              <ChevronDownIcon
                className={cn('w-5 h-5 transition-transform', openClients && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {openClients && (
              <div id="mobile-clients-menu" className="bg-black/20 pl-4" role="menu">
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
              className="w-full py-4 border-b border-white/10 text-white text-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#1a1a2e]"
              aria-expanded={openResources}
              aria-controls="mobile-resources-menu"
            >
              {t('resources')}
              <ChevronDownIcon
                className={cn('w-5 h-5 transition-transform', openResources && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {openResources && (
              <div id="mobile-resources-menu" className="bg-black/20 pl-4" role="menu">
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
