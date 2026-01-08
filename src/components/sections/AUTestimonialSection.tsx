import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { QuoteBlock } from './QuoteBlock'
import { Container } from '../ui/Container'

export function AUTestimonialSection(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  if (!isAU) {
    return <></>
  }

  const metrics = t('testimonial.metrics', { returnObjects: true }) as Record<string, string>

  return (
    <section className="py-24 relative">
      <Container>
        <div className="max-w-[700px]">
          <QuoteBlock
            quote={t('testimonial.quote')}
            author={t('testimonial.author')}
            className="p-10 bg-surface rounded-r-lg mb-8"
          />
          <div className="flex flex-wrap gap-12 mt-8">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="text-base text-text-secondary">
                <strong className="font-bold text-lg text-text">{value.split(' ')[0]}</strong>{' '}
                {value.split(' ').slice(1).join(' ')}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
