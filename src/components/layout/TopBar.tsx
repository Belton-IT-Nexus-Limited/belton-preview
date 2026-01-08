import { PhoneIcon, ComputerDesktopIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { cn } from '@/lib/utils'

export function TopBar(): JSX.Element {
  const { t } = useTranslation('common')
  const { isAU } = useRegion()

  const phone = t('phone')
  const phoneFormatted = t('phoneFormatted')
  const email = t('email')
  const remoteSupportHref = isAU ? '/au/remote-support' : '/remote-support'
  const portalUrl = t('portalUrl')
  const nzHref = '/'
  const auHref = '/au'

  return (
    <div className="fixed top-0 left-0 right-0 z-[1001] bg-brand-red py-2">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div className="flex justify-end items-center gap-8 pr-10">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors font-semibold text-[0.9375rem]"
          >
            <PhoneIcon className="w-4 h-4 text-white" />
            {phoneFormatted}
          </a>
          <Link
            to={remoteSupportHref}
            className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
          >
            <ComputerDesktopIcon className="w-4 h-4 text-white" />
            {t('remoteSupport')}
          </Link>
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
          >
            <UserCircleIcon className="w-4 h-4 text-white" />
            {t('clientPortal')}
          </a>
          <div className="border-l border-white/20 pl-8 ml-2">
            <div className="flex items-center gap-2">
              <Link
                to={nzHref}
                className={cn(
                  'text-sm text-white/90 hover:text-white transition-colors',
                  !isAU && 'font-semibold'
                )}
                title="New Zealand"
              >
                NZ
              </Link>
              <span className="text-white/20">|</span>
              <Link
                to={auHref}
                className={cn(
                  'text-sm text-white/90 hover:text-white transition-colors',
                  isAU && 'font-semibold'
                )}
                title="Australia"
              >
                AU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
