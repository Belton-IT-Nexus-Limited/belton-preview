import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

interface CheckResult {
  name: string
  passed: boolean
  message: string
  critical: boolean
}

const results: CheckResult[] = []

function addResult(name: string, passed: boolean, message: string, critical = true): void {
  results.push({ name, passed, message, critical })
}

function checkLinting(): void {
  try {
    execSync('pnpm lint', { stdio: 'pipe', cwd: process.cwd() })
    addResult('Linting', true, 'All ESLint checks passed')
  } catch {
    addResult('Linting', false, 'ESLint errors found. Run: pnpm lint', true)
  }
}

function checkTypeScript(): void {
  try {
    execSync('pnpm tsc --noEmit', { stdio: 'pipe', cwd: process.cwd() })
    addResult('TypeScript', true, 'No TypeScript errors')
  } catch {
    addResult('TypeScript', false, 'TypeScript errors found. Run: pnpm build', true)
  }
}

function checkBuild(): void {
  try {
    execSync('pnpm build', { stdio: 'pipe', cwd: process.cwd() })
    addResult('Build', true, 'Production build successful')
  } catch {
    addResult('Build', false, 'Build failed. Check errors above', true)
  }
}

function checkSitemap(): void {
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
  if (existsSync(sitemapPath)) {
    const content = readFileSync(sitemapPath, 'utf-8')
    if (content.includes('<?xml') && content.includes('<urlset')) {
      addResult('Sitemap', true, 'Sitemap.xml exists and is valid')
    } else {
      addResult('Sitemap', false, 'Sitemap.xml exists but may be invalid', true)
    }
  } else {
    addResult('Sitemap', false, 'Sitemap.xml not found. Run: pnpm generate-sitemap', true)
  }
}

function checkRobotsTxt(): void {
  const robotsPath = join(process.cwd(), 'public', 'robots.txt')
  if (existsSync(robotsPath)) {
    const content = readFileSync(robotsPath, 'utf-8')
    if (content.includes('User-agent') || content.includes('Sitemap')) {
      addResult('Robots.txt', true, 'Robots.txt exists and configured')
    } else {
      addResult('Robots.txt', false, 'Robots.txt exists but may be incomplete', false)
    }
  } else {
    addResult('Robots.txt', false, 'Robots.txt not found', true)
  }
}

function checkRedirects(): void {
  const redirectsPath = join(process.cwd(), 'public', '_redirects')
  if (existsSync(redirectsPath)) {
    const content = readFileSync(redirectsPath, 'utf-8')
    if (content.trim().length > 0) {
      addResult('Redirects', true, 'Redirects file exists')
    } else {
      addResult('Redirects', false, 'Redirects file is empty. Run: pnpm generate-redirects', true)
    }
  } else {
    addResult('Redirects', false, 'Redirects file not found. Run: pnpm generate-redirects', true)
  }
}

function checkSecurityHeaders(): void {
  const headersPath = join(process.cwd(), '_headers')
  const netlifyPath = join(process.cwd(), 'netlify.toml')
  const vercelPath = join(process.cwd(), 'vercel.json')
  
  if (existsSync(headersPath) || existsSync(netlifyPath) || existsSync(vercelPath)) {
    addResult('Security Headers', true, 'Security headers configured')
  } else {
    addResult('Security Headers', false, 'Security headers not configured', true)
  }
}

function checkEnvironmentFiles(): void {
  const envExample = join(process.cwd(), '.env.example')
  if (existsSync(envExample)) {
    addResult('Environment Config', true, '.env.example exists')
  } else {
    addResult('Environment Config', false, '.env.example not found', false)
  }
}

function checkTranslationFiles(): void {
  const nzCommon = join(process.cwd(), 'src', 'i18n', 'locales', 'en-NZ', 'common.json')
  const auCommon = join(process.cwd(), 'src', 'i18n', 'locales', 'en-AU', 'common.json')
  const nzHome = join(process.cwd(), 'src', 'i18n', 'locales', 'en-NZ', 'pages', 'home.json')
  const auHome = join(process.cwd(), 'src', 'i18n', 'locales', 'en-AU', 'pages', 'home.json')
  
  if (existsSync(nzCommon) && existsSync(auCommon) && existsSync(nzHome) && existsSync(auHome)) {
    addResult('Translation Files', true, 'Core translation files exist')
  } else {
    addResult('Translation Files', false, 'Missing translation files', true)
  }
}

function checkRoutes(): void {
  const routesPath = join(process.cwd(), 'src', 'app', 'routes.tsx')
  if (existsSync(routesPath)) {
    const content = readFileSync(routesPath, 'utf-8')
    const routeCount = (content.match(/path=["']/g) || []).length
    if (routeCount >= 6) {
      addResult('Routes', true, `Found ${routeCount} routes defined`)
    } else {
      addResult('Routes', false, `Only ${routeCount} routes found, expected at least 6`, true)
    }
  } else {
    addResult('Routes', false, 'Routes file not found', true)
  }
}

function checkPages(): void {
  const pagesDir = join(process.cwd(), 'src', 'pages')
  const homePage = join(pagesDir, 'Home', 'HomePage.tsx')
  const servicesPage = join(pagesDir, 'Services', 'ServicesPage.tsx')
  const contactPage = join(pagesDir, 'Contact', 'ContactPage.tsx')
  
  const allExist = existsSync(homePage) && existsSync(servicesPage) && existsSync(contactPage)
  
  if (allExist) {
    addResult('Page Components', true, 'All core page components exist')
  } else {
    addResult('Page Components', false, 'Missing page components', true)
  }
}

function checkServiceWorker(): void {
  const swPath = join(process.cwd(), 'dist', 'sw.js')
  if (existsSync(swPath)) {
    addResult('Service Worker', true, 'Service worker generated')
  } else {
    addResult('Service Worker', false, 'Service worker not found. Run: pnpm build', false)
  }
}

function checkBundleSize(): void {
  const distAssets = join(process.cwd(), 'dist', 'assets')
  if (existsSync(distAssets)) {
    try {
      const files = execSync('find dist/assets -name "*.js" -type f', { encoding: 'utf-8', cwd: process.cwd() }).trim().split('\n').filter(Boolean)
      let hasLargeFiles = false
      
      files.forEach((file) => {
        try {
          const stats = execSync(`stat -f%z "${file}"`, { encoding: 'utf-8', cwd: process.cwd() })
          const size = parseInt(stats.trim(), 10)
          if (size > 1000000) {
            hasLargeFiles = true
          }
        } catch {
          // Ignore stat errors
        }
      })
      
      if (hasLargeFiles) {
        addResult('Bundle Size', false, 'Some bundle files exceed 1MB. Consider code splitting', false)
      } else {
        addResult('Bundle Size', true, 'Bundle sizes within limits')
      }
    } catch {
      addResult('Bundle Size', false, 'Could not check bundle sizes', false)
    }
  } else {
    addResult('Bundle Size', false, 'Build output not found. Run: pnpm build', false)
  }
}

function runValidationScripts(): void {
  try {
    execSync('pnpm test:seo', { stdio: 'pipe', cwd: process.cwd() })
    addResult('SEO Validation', true, 'SEO checks passed')
  } catch {
    addResult('SEO Validation', false, 'SEO validation failed. Run: pnpm test:seo', true)
  }
  
  try {
    execSync('pnpm content:validate', { stdio: 'pipe', cwd: process.cwd() })
    addResult('Content Validation', true, 'Translation validation passed')
  } catch {
    addResult('Content Validation', false, 'Translation validation failed. Run: pnpm content:validate', true)
  }
}

function main(): void {
  console.log('🚀 Running Go-Live Pre-Launch Checks...\n')
  
  console.log('📋 Code Quality Checks...')
  checkLinting()
  checkTypeScript()
  checkBuild()
  
  console.log('📄 File Checks...')
  checkSitemap()
  checkRobotsTxt()
  checkRedirects()
  checkSecurityHeaders()
  checkEnvironmentFiles()
  
  console.log('🌐 Content Checks...')
  checkTranslationFiles()
  checkRoutes()
  checkPages()
  
  console.log('⚡ Performance Checks...')
  checkServiceWorker()
  checkBundleSize()
  
  console.log('✅ Validation Scripts...')
  runValidationScripts()
  
  console.log('\n📊 Results:\n')
  
  const passed = results.filter((r) => r.passed)
  const failed = results.filter((r) => !r.passed)
  const criticalFailed = failed.filter((r) => r.critical)
  
  results.forEach((result) => {
    const icon = result.passed ? '✅' : result.critical ? '❌' : '⚠️'
    console.log(`${icon} ${result.name}: ${result.message}`)
  })
  
  console.log('\n📈 Summary:')
  console.log(`   Total checks: ${results.length}`)
  console.log(`   Passed: ${passed.length}`)
  console.log(`   Failed: ${failed.length}`)
  console.log(`   Critical failures: ${criticalFailed.length}`)
  
  if (criticalFailed.length > 0) {
    console.log('\n❌ Critical issues must be resolved before launch!')
    process.exit(1)
  } else if (failed.length > 0) {
    console.log('\n⚠️  Some non-critical issues found. Review before launch.')
    process.exit(0)
  } else {
    console.log('\n✅ All checks passed! Ready for launch.')
    process.exit(0)
  }
}

main()
