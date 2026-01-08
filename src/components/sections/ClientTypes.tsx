import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { SectionTitle } from './SectionTitle'

export function ClientTypes(): JSX.Element {
  const { t } = useTranslation('pages/home')

  const types = [
    {
      key: 'growing',
      title: t('whoWeHelp.types.growing.title'),
      description: t('whoWeHelp.types.growing.description')
    },
    {
      key: 'compliance',
      title: t('whoWeHelp.types.compliance.title'),
      description: t('whoWeHelp.types.compliance.description')
    },
    {
      key: 'security',
      title: t('whoWeHelp.types.security.title'),
      description: t('whoWeHelp.types.security.description')
    },
    {
      key: 'microsoft',
      title: t('whoWeHelp.types.microsoft.title'),
      description: t('whoWeHelp.types.microsoft.description')
    }
  ]

  return (
    <Container className="py-24">
      <SectionTitle
        label={t('whoWeHelp.label')}
        title={t('whoWeHelp.title')}
        subtitle={t('whoWeHelp.intro')}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-8">
        {types.map((type) => (
          <Card key={type.key} hover={false} className="p-6">
            <h3 className="text-base font-semibold mb-2">{type.title}</h3>
            <p className="text-[0.9375rem] text-text-secondary leading-relaxed">{type.description}</p>
          </Card>
        ))}
      </div>
    </Container>
  )
}
