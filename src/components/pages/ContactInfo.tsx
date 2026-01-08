import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>
  title: string
  content: string | React.ReactNode
  href?: string
}

export function ContactInfo(): JSX.Element {
  const { t } = useTranslation('pages/contact')
  const { t: tCommon } = useTranslation('common')

  const methods: ContactMethod[] = [
    {
      icon: PhoneIcon,
      title: t('info.phone.title'),
      content: tCommon('phone'),
      href: `tel:${tCommon('phone')}`
    },
    {
      icon: EnvelopeIcon,
      title: t('info.email.title'),
      content: tCommon('email'),
      href: `mailto:${tCommon('email')}`
    },
    {
      icon: MapPinIcon,
      title: t('info.address.title'),
      content: tCommon('address')
    },
    {
      icon: ClockIcon,
      title: t('info.hours.title'),
      content: t('info.hours.content')
    }
  ]

  return (
    <div className="relative z-10">
      <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold mb-4 tracking-[-0.01em]">
        {t('info.title')}
      </h2>
      <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-[400px]">
        {t('info.description')}
      </p>

      <div className="flex flex-col gap-6 mb-10">
        {methods.map((method, index) => {
          const Icon = method.icon
          const content = method.href ? (
            <a
              href={method.href}
              className="text-[0.9375rem] text-text-secondary hover:text-text transition-colors"
            >
              {method.content}
            </a>
          ) : (
            <p className="text-[0.9375rem] text-text-secondary">{method.content}</p>
          )

          return (
            <div key={index} className="flex items-start gap-4">
              <div className="w-11 h-11 flex items-center justify-center bg-surface border border-border rounded-[10px] text-accent flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-[0.9375rem] font-semibold mb-1">{method.title}</h3>
                {content}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg">
        <div className="w-5 h-5 text-accent flex-shrink-0">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-sm text-text-secondary">{t('info.responseNote')}</p>
      </div>
    </div>
  )
}
