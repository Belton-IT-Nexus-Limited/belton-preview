import { readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'

interface PerformanceIssue {
  type: 'error' | 'warning'
  message: string
  file?: string
  size?: number
}

const issues: PerformanceIssue[] = []
const maxChunkSize = 300 * 1024

function checkBundleSizes(): void {
  const distPath = join(process.cwd(), 'dist')
  
  if (!existsSync(distPath)) {
    issues.push({
      type: 'error',
      message: 'dist directory not found. Run "pnpm build" first.'
    })
    return
  }

  try {
    const assetsPath = join(distPath, 'assets')
    if (!existsSync(assetsPath)) {
      return
    }

    const checkFile = (filePath: string): void => {
      if (!existsSync(filePath)) {
        return
      }

      const stats = statSync(filePath)
      const size = stats.size
      const fileName = filePath.split('/').pop() || ''

      if (fileName.endsWith('.js')) {
        if (size > maxChunkSize && !fileName.includes('vendor')) {
          issues.push({
            type: 'warning',
            message: `Large JavaScript chunk: ${fileName} (${(size / 1024).toFixed(2)} KB)`,
            file: fileName,
            size
          })
        }
      }

      if (fileName.endsWith('.css')) {
        if (size > 100 * 1024) {
          issues.push({
            type: 'warning',
            message: `Large CSS file: ${fileName} (${(size / 1024).toFixed(2)} KB)`,
            file: fileName,
            size
          })
        }
      }
    }

    const indexHtmlPath = join(distPath, 'index.html')
    if (existsSync(indexHtmlPath)) {
      const html = readFileSync(indexHtmlPath, 'utf-8')
      const jsMatches = html.match(/assets\/[^"]+\.js/g) || []
      const cssMatches = html.match(/assets\/[^"]+\.css/g) || []

      jsMatches.forEach((match) => {
        const filePath = join(distPath, match)
        checkFile(filePath)
      })

      cssMatches.forEach((match) => {
        const filePath = join(distPath, match)
        checkFile(filePath)
      })
    }
  } catch (error) {
    issues.push({
      type: 'error',
      message: `Failed to check bundle sizes: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}

function checkImageOptimization(): void {
  const imagesPath = join(process.cwd(), 'public', 'images')
  
  if (!existsSync(imagesPath)) {
    return
  }

  try {
    const largeImageThreshold = 500 * 1024

    const checkImage = (filePath: string): void => {
      if (!existsSync(filePath)) {
        return
      }

      const stats = statSync(filePath)
      const size = stats.size
      const fileName = filePath.split('/').pop() || ''

      if (size > largeImageThreshold && !fileName.endsWith('.webp')) {
        issues.push({
          type: 'warning',
          message: `Large image not in WebP format: ${fileName} (${(size / 1024).toFixed(2)} KB). Consider converting to WebP.`,
          file: fileName,
          size
        })
      }
    }

    const imageFiles = [
      'belton-logo-white-red.png',
      'microsoft-partner-logo.png',
      'belton-house.webp',
      'favicon-32x32.png'
    ]

    imageFiles.forEach((image) => {
      const imagePath = join(imagesPath, image)
      checkImage(imagePath)
    })
  } catch {
    // Ignore errors
  }
}

function checkServiceWorker(): void {
  const swPath = join(process.cwd(), 'dist', 'sw.js')
  
  if (!existsSync(swPath)) {
    issues.push({
      type: 'warning',
      message: 'Service worker not found. PWA features may not work.',
      file: 'dist/sw.js'
    })
    return
  }

  try {
    const sw = readFileSync(swPath, 'utf-8')
    
    if (!sw.includes('workbox')) {
      issues.push({
        type: 'warning',
        message: 'Service worker may not be properly configured',
        file: 'dist/sw.js'
      })
    }
  } catch {
    // Ignore errors
  }
}

function main(): void {
  console.log('⚡ Running performance checks...\n')

  checkBundleSizes()
  checkImageOptimization()
  checkServiceWorker()

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
    console.log('✅ All performance checks passed!')
    console.log('\n💡 Tips:')
    console.log('  - Run Lighthouse audit for detailed performance metrics')
    console.log('  - Test on slow 3G connection')
    console.log('  - Monitor Core Web Vitals')
    process.exit(0)
  }

  if (errors.length > 0) {
    console.log(`\n❌ Found ${errors.length} error(s) and ${warnings.length} warning(s)`)
    process.exit(1)
  }

  console.log(`\n⚠️  Found ${warnings.length} warning(s)`)
  console.log('\n💡 These are recommendations. Review and optimize as needed.')
  process.exit(0)
}

main()
