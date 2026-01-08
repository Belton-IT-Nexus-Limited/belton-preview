import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

interface SEOIssue {
  type: 'error' | 'warning'
  message: string
  file?: string
}

const issues: SEOIssue[] = []

function checkSitemap(): void {
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
  
  if (!existsSync(sitemapPath)) {
    issues.push({
      type: 'error',
      message: 'sitemap.xml not found in public directory',
      file: 'public/sitemap.xml'
    })
    return
  }

  try {
    const sitemap = readFileSync(sitemapPath, 'utf-8')
    
    if (!sitemap.includes('<?xml version="1.0"')) {
      issues.push({
        type: 'error',
        message: 'sitemap.xml is not valid XML',
        file: 'public/sitemap.xml'
      })
    }

    if (!sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      issues.push({
        type: 'error',
        message: 'sitemap.xml missing required namespace',
        file: 'public/sitemap.xml'
      })
    }

    const urlCount = (sitemap.match(/<url>/g) || []).length
    if (urlCount === 0) {
      issues.push({
        type: 'error',
        message: 'sitemap.xml contains no URLs',
        file: 'public/sitemap.xml'
      })
    }

    if (!sitemap.includes('hreflang')) {
      issues.push({
        type: 'warning',
        message: 'sitemap.xml missing hreflang tags for multi-region support',
        file: 'public/sitemap.xml'
      })
    }
  } catch (error) {
    issues.push({
      type: 'error',
      message: `Failed to read sitemap.xml: ${error instanceof Error ? error.message : 'Unknown error'}`,
      file: 'public/sitemap.xml'
    })
  }
}

function checkRobotsTxt(): void {
  const robotsPath = join(process.cwd(), 'public', 'robots.txt')
  
  if (!existsSync(robotsPath)) {
    issues.push({
      type: 'error',
      message: 'robots.txt not found in public directory',
      file: 'public/robots.txt'
    })
    return
  }

  try {
    const robots = readFileSync(robotsPath, 'utf-8')
    
    if (!robots.includes('User-agent:')) {
      issues.push({
        type: 'warning',
        message: 'robots.txt missing User-agent directive',
        file: 'public/robots.txt'
      })
    }

    if (!robots.includes('Sitemap:')) {
      issues.push({
        type: 'warning',
        message: 'robots.txt missing Sitemap reference',
        file: 'public/robots.txt'
      })
    }
  } catch (error) {
    issues.push({
      type: 'error',
      message: `Failed to read robots.txt: ${error instanceof Error ? error.message : 'Unknown error'}`,
      file: 'public/robots.txt'
    })
  }
}

function checkStructuredData(): void {
  const pagesPath = join(process.cwd(), 'src', 'pages')
  
  const pages = [
    'Home/HomePage.tsx',
    'Services/ServicesPage.tsx',
    'Contact/ContactPage.tsx'
  ]

  pages.forEach((page) => {
    const pagePath = join(pagesPath, page)
    if (!existsSync(pagePath)) {
      return
    }

    try {
      const content = readFileSync(pagePath, 'utf-8')
      
      if (!content.includes('StructuredData')) {
        issues.push({
          type: 'warning',
          message: `Missing StructuredData component in ${page}`,
          file: pagePath
        })
      }

      if (!content.includes('SEO')) {
        issues.push({
          type: 'warning',
          message: `Missing SEO component in ${page}`,
          file: pagePath
        })
      }
    } catch {
      // Ignore read errors
    }
  })
}

function main(): void {
  console.log('🔍 Running SEO validation...\n')

  checkSitemap()
  checkRobotsTxt()
  checkStructuredData()

  const errors = issues.filter((i) => i.type === 'error')
  const warnings = issues.filter((i) => i.type === 'warning')

  if (errors.length > 0) {
    console.log('❌ Errors found:')
    errors.forEach((issue) => {
      console.log(`  - ${issue.message}${issue.file ? ` (${issue.file})` : ''}`)
    })
    console.log('')
  }

  if (warnings.length > 0) {
    console.log('⚠️  Warnings:')
    warnings.forEach((issue) => {
      console.log(`  - ${issue.message}${issue.file ? ` (${issue.file})` : ''}`)
    })
    console.log('')
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All SEO checks passed!')
    process.exit(0)
  }

  if (errors.length > 0) {
    console.log(`\n❌ Found ${errors.length} error(s) and ${warnings.length} warning(s)`)
    process.exit(1)
  }

  console.log(`\n⚠️  Found ${warnings.length} warning(s)`)
  process.exit(0)
}

main()
