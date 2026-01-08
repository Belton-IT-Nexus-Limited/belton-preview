import { PageHeader } from '@/components/pages/PageHeader'
import { ContactInfo } from '@/components/pages/ContactInfo'
import { ContactForm } from '@/components/forms/ContactForm'
import { Container } from '@/components/ui/Container'
import { useTranslation } from 'react-i18next'
import { getImagePath } from '@/lib/images'
import { cn } from '@/lib/utils'

export function ContactPage(): JSX.Element {
  const { t } = useTranslation('pages/contact')
  const { t: tCommon } = useTranslation('common')

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: tCommon('home'), href: '/' },
          { label: t('title') }
        ]}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <section
        className={cn(
          'py-20 px-[5%] relative overflow-hidden',
          'before:absolute before:inset-0 before:bg-cover before:bg-center before:opacity-[0.08] before:grayscale before:contrast-110',
          'before:pointer-events-none before:z-0',
          'after:absolute after:top-[-20%] after:right-[-10%] after:w-[50vmax] after:h-[50vmax]',
          'after:bg-[radial-gradient(circle_at_center,rgba(207,29,30,0.06)_0%,transparent_60%)]',
          'after:blur-[80px] after:pointer-events-none after:z-0'
        )}
        style={{
          '--bg-image': `url(${getImagePath('beltonHouse')})`
        } as React.CSSProperties & { '--bg-image': string }}
      >
        <style>{`
          section::before {
            background-image: var(--bg-image);
          }
        `}</style>
        <Container>
          <div className="grid grid-cols-[1fr_1.2fr] gap-16 max-w-[1100px] mx-auto relative z-10 md:grid-cols-1 md:gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
