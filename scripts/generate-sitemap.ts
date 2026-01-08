import { writeFileSync } from 'fs'
import { join } from 'path'
import { siteConfig } from '../src/lib/seo'

interface SitemapUrl {
  loc: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  lastmod?: string
}

const routes = [
  { path: '', changefreq: 'weekly', priority: 1.0 },
  { path: '/services', changefreq: 'monthly', priority: 0.9 },
  { path: '/contact', changefreq: 'monthly', priority: 0.9 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/how-we-work', changefreq: 'monthly', priority: 0.8 },
  { path: '/managed-it', changefreq: 'monthly', priority: 0.8 },
  { path: '/security', changefreq: 'monthly', priority: 0.8 },
  { path: '/microsoft365', changefreq: 'monthly', priority: 0.8 },
  { path: '/cloud', changefreq: 'monthly', priority: 0.7 },
  { path: '/backup', changefreq: 'monthly', priority: 0.7 },
  { path: '/identity', changefreq: 'monthly', priority: 0.7 },
  { path: '/email-security', changefreq: 'monthly', priority: 0.7 },
  { path: '/endpoints', changefreq: 'monthly', priority: 0.7 },
  { path: '/network-security', changefreq: 'monthly', priority: 0.7 },
  { path: '/connectivity', changefreq: 'monthly', priority: 0.7 },
  { path: '/voice', changefreq: 'monthly', priority: 0.7 },
  { path: '/compliance', changefreq: 'monthly', priority: 0.7 },
  { path: '/it-advisory', changefreq: 'monthly', priority: 0.7 },
  { path: '/ai', changefreq: 'monthly', priority: 0.7 },
  { path: '/projects', changefreq: 'monthly', priority: 0.7 },
  { path: '/blueprint', changefreq: 'monthly', priority: 0.7 },
  { path: '/licensing', changefreq: 'monthly', priority: 0.6 },
  { path: '/procurement', changefreq: 'monthly', priority: 0.6 },
  { path: '/remote-support', changefreq: 'monthly', priority: 0.6 },
  { path: '/client-success', changefreq: 'monthly', priority: 0.7 },
  { path: '/who-we-work-with', changefreq: 'monthly', priority: 0.7 },
  { path: '/faq', changefreq: 'monthly', priority: 0.6 },
  { path: '/diy-cybersecurity', changefreq: 'monthly', priority: 0.6 },
  { path: '/essential-eight', changefreq: 'monthly', priority: 0.6 },
  { path: '/security-assessment', changefreq: 'monthly', priority: 0.7 },
  { path: '/cyber-insurance-readiness', changefreq: 'monthly', priority: 0.6 },
  { path: '/m365-security-checklist', changefreq: 'monthly', priority: 0.6 },
  { path: '/cyber-package', changefreq: 'monthly', priority: 0.7 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms', changefreq: 'yearly', priority: 0.3 },
  { path: '/legal', changefreq: 'yearly', priority: 0.3 }
]

function generateSitemap(): void {
  const lastmod = new Date().toISOString().split('T')[0]

  const urls: SitemapUrl[] = []

  routes.forEach((route) => {
    const nzPath = route.path === '' ? '/' : route.path
    const auPath = route.path === '' ? '/au' : `/au${route.path}`

    urls.push({
      loc: `${siteConfig.siteUrl.nz}${nzPath}`,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod
    })

    urls.push({
      loc: `${siteConfig.siteUrl.au}${auPath}`,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((url) => {
    let nzUrl = url.loc
    let auUrl = url.loc

    if (url.loc.startsWith(siteConfig.siteUrl.au)) {
      const path = url.loc.replace(siteConfig.siteUrl.au, '')
      if (path === '/au') {
        nzUrl = `${siteConfig.siteUrl.nz}/`
      } else {
        nzUrl = `${siteConfig.siteUrl.nz}${path.replace('/au', '')}`
      }
      auUrl = url.loc
    } else {
      nzUrl = url.loc
      const path = url.loc.replace(siteConfig.siteUrl.nz, '')
      if (path === '/') {
        auUrl = `${siteConfig.siteUrl.au}/au`
      } else {
        auUrl = `${siteConfig.siteUrl.au}/au${path}`
      }
    }

    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-NZ" href="${nzUrl}" />
    <xhtml:link rel="alternate" hreflang="en-AU" href="${auUrl}" />
  </url>`
  })
  .join('\n')}
</urlset>`

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap, 'utf-8')
}

generateSitemap()
