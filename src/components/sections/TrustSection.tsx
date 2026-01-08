import { useTranslation } from 'react-i18next'
import { QuoteBlock } from './QuoteBlock'
import { Container } from '../ui/Container'
import { cn } from '@/lib/utils'

export function TrustSection(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  if (isAU) {
    return <></>
  }

  return (
    <section className="bg-bg-elevated py-24">
      <Container>
        <div className="grid grid-cols-[2fr_1fr] gap-16 items-start max-w-[1200px] mx-auto md:grid-cols-1 md:gap-8">
          <div className="p-8 bg-bg border-l-4 border-accent rounded-r-lg">
            <p className="text-lg leading-relaxed italic mb-4">{t('trust.quote')}</p>
            <cite className="text-sm text-text-muted not-italic">{t('trust.quoteAuthor')}</cite>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <strong className="block text-2xl font-bold text-text mb-1">
                {t('trust.facts.years.value')}
              </strong>
              <span className="text-sm text-text-muted">{t('trust.facts.years.label')}</span>
            </div>
            <div>
              <strong className="block text-2xl font-bold text-text mb-1">
                {t('trust.facts.organisations.value')}
              </strong>
              <span className="text-sm text-text-muted">{t('trust.facts.organisations.label')}</span>
            </div>
            <div>
              <strong className="block text-2xl font-bold text-text mb-1">
                {t('trust.facts.location.value')}
              </strong>
              <span className="text-sm text-text-muted">{t('trust.facts.location.label')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
