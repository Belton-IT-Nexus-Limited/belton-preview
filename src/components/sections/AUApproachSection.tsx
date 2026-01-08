import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { Container } from '../ui/Container'
import { ProseBlock } from './ProseBlock'
import { SectionTitle } from './SectionTitle'

export function AUApproachSection(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  if (!isAU) {
    return <></>
  }

  const details = t('approach.details.items', { returnObjects: true }) as string[]

  return (
    <section className="bg-bg-elevated py-24 relative">
      <Container>
        <div className="grid grid-cols-2 gap-16 items-start max-w-[1100px] mx-auto md:grid-cols-1 md:gap-8">
          <ProseBlock>
            <SectionTitle title={t('approach.title')} />
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              {t('approach.intro1')}
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-5">
              {t('approach.intro2')}
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('approach.intro3')}
            </p>
          </ProseBlock>

          <div className="p-8 bg-surface border border-border rounded-lg">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-5">
              {t('approach.details.title')}
            </h4>
            <ul className="list-none p-0 m-0">
              {Array.isArray(details) && details.map((item, index) => (
                <li
                  key={index}
                  className="text-[0.9375rem] text-text-secondary py-2.5 border-b border-border last:border-b-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
