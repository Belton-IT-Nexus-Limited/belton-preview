import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

interface LinkIssue {
  type: 'error' | 'warning'
  message: string
  file?: string
  link?: string
}

const issues: LinkIssue[] = []
const validRoutes = new Set<string>()

function collectRoutes(): void {
  const routesFile = join(process.cwd(), 'src', 'app', 'routes.tsx')
  
  if (!existsSync(routesFile)) {
    return
  }

  try {
    const content = readFileSync(routesFile, 'utf-8')
    const routeMatches = content.match(/path=["']([^"']+)["']/g) || []
    
    routeMatches.forEach((match) => {
      const path = match.replace(/path=["']/, '').replace(/["']/, '')
      if (path && path !== '*') {
        validRoutes.add(path)
        if (path.startsWith('/au')) {
          validRoutes.add(path.replace('/au', ''))
        } else {
          validRoutes.add(`/au${path}`)
        }
      }
    })
  } catch {
    // Ignore errors
  }
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir)
  
  files.forEach((file) => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

function checkComponentLinks(): void {
  const componentsPath = join(process.cwd(), 'src', 'components')
  
  if (!existsSync(componentsPath)) {
    return
  }

  try {
    const files = getAllFiles(componentsPath)
    
    files.forEach((filePath) => {
      const file = filePath.replace(componentsPath + '/', '')
      const content = readFileSync(filePath, 'utf-8')
      
      const linkMatches = content.match(/to=["']([^"']+)["']/g) || []
      const hrefMatches = content.match(/href=["']([^"']+)["']/g) || []
      
      const allLinks = [...linkMatches, ...hrefMatches].map((match) => {
        return match.replace(/to=["']/, '').replace(/href=["']/, '').replace(/["']/, '')
      })

      allLinks.forEach((link) => {
        if (link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:')) {
          return
        }

        if (link.startsWith('#') || link === '' || link === '/') {
          return
        }

        if (!validRoutes.has(link) && !link.startsWith('http')) {
          issues.push({
            type: 'warning',
            message: `Potential broken link: ${link}`,
            file: file,
            link: link
          })
        }
      })
    })
  } catch (error) {
    issues.push({
      type: 'error',
      message: `Failed to check component links: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}

function main(): void {
  console.log('🔗 Validating links...\n')

  collectRoutes()
  checkComponentLinks()

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
      console.log(`  - ${issue.message}${issue.file ? ` in ${issue.file}` : ''}${issue.link ? ` (${issue.link})` : ''}`)
    })
    console.log('')
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All link checks passed!')
    console.log('\n💡 Note: This is a static check. Test links manually in the browser.')
    process.exit(0)
  }

  if (errors.length > 0) {
    console.log(`\n❌ Found ${errors.length} error(s) and ${warnings.length} warning(s)`)
    process.exit(1)
  }

  console.log(`\n⚠️  Found ${warnings.length} warning(s)`)
  console.log('\n💡 Review these links and ensure they are valid routes.')
  process.exit(0)
}

main()
