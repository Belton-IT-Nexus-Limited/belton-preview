import { CheckCircleIcon, ClockIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { StyledLink } from '../ui/Link'
import { Container } from '../ui/Container'
import { SectionTitle } from './SectionTitle'
import { ProseBlock } from './ProseBlock'
import { cn } from '@/lib/utils'

const iconMap = {
  ownership: CheckCircleIcon,
  response: ClockIcon,
  documentation: DocumentTextIcon,
  reviews: ChartBarIcon
}

export function HowWeWorkPreview(): JSX.Element {
  const { t } = useTranslation('pages/home')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : ''

  const points = [
    {
      key: 'ownership',
      title: t('howWeWork.points.ownership.title'),
      description: t('howWeWork.points.ownership.description')
    },
    {
      key: 'response',
      title: t('howWeWork.points.response.title'),
      description: t('howWeWork.points.response.description')
    },
    {
      key: 'documentation',
      title: t('howWeWork.points.documentation.title'),
      description: t('howWeWork.points.documentation.description')
    },
    {
      key: 'reviews',
      title: t('howWeWork.points.reviews.title'),
      description: t('howWeWork.points.reviews.description')
    }
  ]

  return (
    <Container className="py-24">
      <div className="grid grid-cols-2 gap-16 items-start max-w-[1100px] mx-auto md:grid-cols-1 md:gap-8">
        <ProseBlock>
          <SectionTitle
            label={t('howWeWork.label')}
            title={t('howWeWork.title')}
          />
          <p className="text-lg text-text-secondary leading-relaxed mb-5">
            {t('howWeWork.intro1')}
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-5">
            {t('howWeWork.intro2')}
          </p>
          <StyledLink
            to={`${basePath}/how-we-work`}
            showArrow
            className="mt-6 text-[0.9375rem] font-medium text-accent"
          >
            {t('howWeWork.link')}
          </StyledLink>
        </ProseBlock>

        <div className="flex flex-col gap-4">
          {points.map((point) => {
            const Icon = iconMap[point.key as keyof typeof iconMap]
            return (
              <div key={point.key} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <h4 className="text-[0.9375rem] font-semibold mb-1">{point.title}</h4>
                  <p className="text-sm text-text-muted m-0">{point.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
