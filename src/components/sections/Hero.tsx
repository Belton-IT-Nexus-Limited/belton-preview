import { ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { OrbBackground } from './OrbBackground'
import { Button } from '../ui/Button'

export function Hero(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { t: tCommon } = useTranslation('common')
  const { isAU } = useRegion()

  const heroTitle = t('hero.title')
  const titleLines = heroTitle.split('\n')

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-bg-elevated via-[#050506] to-[#0d0808] pt-[calc(100px+37px+100px)] md:pt-[200px]">
      <OrbBackground />

      <div className="relative z-10 px-[5%] max-w-[800px]">
        {isAU && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 border border-border rounded-full text-xs font-medium text-text-secondary mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot" />
            {t('hero.badge')}
          </div>
        )}

        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] mb-6 tracking-[-0.02em]">
          {titleLines.map((line, index) => {
            const parts = line.split(/(for growing|Australian business|Reliable, secure IT|Without the complexity)/)
            return (
              <span key={index} className="block">
                {parts.map((part, partIndex) => {
                  if (part === 'for growing' || part === 'Without the complexity') {
                    return (
                      <span key={partIndex} className="font-light text-text-secondary">
                        {part}
                      </span>
                    )
                  }
                  if (part === 'Australian business' || part === 'Reliable, secure IT') {
                    return (
                      <span key={partIndex} className="text-accent">
                        {part}
                      </span>
                    )
                  }
                  return <span key={partIndex}>{part}</span>
                })}
              </span>
            )
          })}
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-[480px]">
          {t('hero.subtitle')}
        </p>

        <div className="flex gap-4 flex-wrap">
          <Button as="link" to={isAU ? '/au/contact' : '/contact'}>
            {t('hero.cta')}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
          {isAU && (
            <Button
              as="link"
              to={`tel:${tCommon('phone')}`}
              variant="outline"
              external
            >
              <PhoneIcon className="w-4 h-4" />
              {t('hero.phone')}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
