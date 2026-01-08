import { useTranslation } from 'react-i18next'

interface StatItem {
  value: string
  label: string
}

export function StatsBar(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  if (!isAU) {
    return <></>
  }

  const stats: StatItem[] = [
    {
      value: t('stats.organisations.value'),
      label: t('stats.organisations.label')
    },
    {
      value: t('stats.years.value'),
      label: t('stats.years.label')
    },
    {
      value: t('stats.support.value'),
      label: t('stats.support.label')
    },
    {
      value: t('stats.uptime.value'),
      label: t('stats.uptime.label')
    }
  ]

  return (
    <section className="bg-bg-elevated border-t border-b border-border py-12">
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div className="grid grid-cols-4 gap-8 md:grid-cols-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-[clamp(2rem,4vw,3rem)] font-light text-text leading-none mb-2">
                {stat.value.split(/(\+|\/|%)/).map((part, i) => (
                  <span key={i} className={part === '+' || part === '/' || part === '%' ? 'text-accent' : ''}>
                    {part}
                  </span>
                ))}
              </div>
              <div className="text-[0.8125rem] text-text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
