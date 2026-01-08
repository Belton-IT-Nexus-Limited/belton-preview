import { Link } from 'react-router-dom'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useRegion } from '@/hooks/useRegion'
import { Container } from '../ui/Container'
import { FooterColumn, FooterLink } from './FooterColumn'
import { Button } from '../ui/Button'

export function Footer(): JSX.Element {
  const { t } = useTranslation('common')
  const { isAU } = useRegion()

  const basePath = isAU ? '/au' : '/'
  const logoPath = '/assets/images/belton-logo-white-red.png'

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="pt-16 pb-8 bg-bg border-t border-border">
      <Container>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-12 max-w-[1200px] mx-auto md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <Link to={basePath}>
              <img
                src={logoPath}
                alt="Belton IT Nexus"
                className="h-9 mb-4 opacity-90"
                width={1620}
                height={556}
              />
            </Link>
            <p className="text-[0.9375rem] text-text-muted leading-relaxed max-w-[280px]">
              {t('tagline')}
            </p>
          </div>

          <FooterColumn title="Services">
            <FooterLink href={`${basePath}/managed-it`}>Managed IT</FooterLink>
            <FooterLink href={`${basePath}/security`}>Security</FooterLink>
            <FooterLink href={`${basePath}/microsoft365`}>Microsoft 365</FooterLink>
            <FooterLink href={`${basePath}/cloud`}>Cloud</FooterLink>
            <FooterLink href={`${basePath}/backup`}>Backup</FooterLink>
            <FooterLink href={`${basePath}/services`}>All Services</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href={`${basePath}/about`}>About</FooterLink>
            <FooterLink href={`${basePath}/how-we-work`}>How We Work</FooterLink>
            <FooterLink href={`${basePath}/client-success`}>Success Stories</FooterLink>
            <FooterLink href={`${basePath}/contact`}>Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Contact">
            <a href={`tel:${t('phone')}`} className="text-[0.9375rem] text-text-muted hover:text-text transition-colors mb-3 block">
              {t('phone')}
            </a>
            <a href={`mailto:${t('email')}`} className="text-[0.9375rem] text-text-muted hover:text-text transition-colors mb-3 block">
              {t('email')}
            </a>
            <span className="text-[0.9375rem] text-text-muted mb-4 block">{t('address')}</span>
            <Button
              as="link"
              to={t('portalUrl')}
              size="sm"
              variant="outline"
              className="mt-4"
              external
            >
              {t('clientPortal')}
            </Button>
          </FooterColumn>
        </div>
      </Container>

      {isAU && (
        <div className="bg-bg-elevated py-4">
          <Container>
            <p className="text-sm text-text-secondary text-center max-w-[1200px] mx-auto">
              {t('acknowledgement')}
            </p>
          </Container>
        </div>
      )}

      <Container>
        <div className="flex justify-between items-center pt-8 border-t border-border max-w-[1200px] mx-auto md:flex-col md:gap-4 md:text-center">
          <p className="text-[0.8125rem] text-text-muted">{t('copyright')}</p>
          <div className="flex gap-8">
            <FooterLink href={`${basePath}/privacy`}>Privacy</FooterLink>
            <FooterLink href={`${basePath}/legal`}>Legal</FooterLink>
          </div>
        </div>
      </Container>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-muted hover:text-text hover:border-border-hover transition-all z-50"
        aria-label={t('backToTop')}
      >
        <ChevronUpIcon className="w-5 h-5" />
      </button>
    </footer>
  )
}
