import { Link } from 'react-router-dom'
import { useRegion } from '@/hooks/useRegion'
import { Container } from '../ui/Container'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  title: string
  subtitle?: string
  className?: string
}

export function PageHeader({ breadcrumbs, title, subtitle, className }: PageHeaderProps): JSX.Element {
  const { isAU } = useRegion()
  const basePath = isAU ? '/au' : ''

  return (
    <section className={cn('py-16 md:py-12', className)}>
      <Container>
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-text-muted">/</span>}
                {crumb.href ? (
                  <Link to={`${basePath}${crumb.href}`} className="hover:text-text transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-4 tracking-[-0.02em]">{title}</h1>
        {subtitle && <p className="text-lg text-text-secondary max-w-[600px]">{subtitle}</p>}
      </Container>
    </section>
  )
}
