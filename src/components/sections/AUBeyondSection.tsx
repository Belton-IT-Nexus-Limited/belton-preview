import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { StyledLink } from '../ui/Link'
import { Container } from '../ui/Container'
import { ProseBlock } from './ProseBlock'
import { SectionTitle } from './SectionTitle'

export function AUBeyondSection(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  if (!isAU) {
    return <></>
  }

  const basePath = isAU ? '/au' : ''
  const links = t('beyond.links', { returnObjects: true }) as Record<string, string>

  return (
    <section className="bg-bg-elevated py-24 relative">
      <Container>
        <ProseBlock maxWidth="narrow">
          <SectionTitle title={t('beyond.title')} />
          <p className="text-lg text-text-secondary leading-relaxed mb-10">
            {t('beyond.intro')}
          </p>
        </ProseBlock>

        <div className="flex gap-8 flex-wrap mt-8 md:flex-col md:gap-4">
          {Object.entries(links).map(([key, label]) => {
            const hrefMap: Record<string, string> = {
              compliance: '/compliance',
              advisory: '/it-advisory',
              projects: '/projects',
              ai: '/ai'
            }
            return (
              <StyledLink
                key={key}
                to={`${basePath}${hrefMap[key] || `/${key}`}`}
                showArrow
                className="text-[0.9375rem] text-text-secondary"
              >
                {label}
              </StyledLink>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
