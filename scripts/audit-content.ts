import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

interface ContentItem {
  file: string
  type: 'text' | 'heading' | 'link' | 'meta' | 'button'
  content: string
  region?: 'nz' | 'au' | 'both'
  page?: string
  selector?: string
}

interface ContentAudit {
  totalFiles: number
  totalContentItems: number
  byRegion: {
    nz: number
    au: number
    both: number
  }
  byType: Record<string, number>
  byPage: Record<string, number>
  items: ContentItem[]
}

function extractTextContent(html: string, filePath: string): ContentItem[] {
  const items: ContentItem[] = []
  const fileName = filePath.split('/').pop() || ''
  const isAU = filePath.includes('/au/')
  const region: 'nz' | 'au' | 'both' = isAU ? 'au' : 'nz'

  const pageName = fileName.replace('.html', '')

  const headingMatches = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || []
  headingMatches.forEach((match) => {
    const content = match.replace(/<[^>]+>/g, '').trim()
    if (content && content.length > 0) {
      items.push({
        file: fileName,
        type: 'heading',
        content,
        region,
        page: pageName
      })
    }
  })

  const paragraphMatches = html.match(/<p[^>]*>(.*?)<\/p>/gi) || []
  paragraphMatches.forEach((match) => {
    const content = match.replace(/<[^>]+>/g, '').trim()
    if (content && content.length > 3) {
      items.push({
        file: fileName,
        type: 'text',
        content,
        region,
        page: pageName
      })
    }
  })

  const linkMatches = html.match(/<a[^>]*>(.*?)<\/a>/gi) || []
  linkMatches.forEach((match) => {
    const content = match.replace(/<[^>]+>/g, '').trim()
    if (content && content.length > 0 && !content.match(/^(<i|<\/i>)/)) {
      items.push({
        file: fileName,
        type: 'link',
        content,
        region,
        page: pageName
      })
    }
  })

  const metaDescription = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']+)["']/i)
  if (metaDescription) {
    items.push({
      file: fileName,
      type: 'meta',
      content: metaDescription[1],
      region,
      page: pageName
    })
  }

  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  if (titleMatch) {
    items.push({
      file: fileName,
      type: 'meta',
      content: titleMatch[1],
      region,
      page: pageName
    })
  }

  const buttonMatches = html.match(/<button[^>]*>(.*?)<\/button>/gi) || []
  buttonMatches.forEach((match) => {
    const content = match.replace(/<[^>]+>/g, '').trim()
    if (content && content.length > 0) {
      items.push({
        file: fileName,
        type: 'button',
        content,
        region,
        page: pageName
      })
    }
  })

  return items
}

function scanDirectory(dir: string, baseDir: string): ContentItem[] {
  const items: ContentItem[] = []
  const files = readdirSync(dir)

  files.forEach((file) => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)

    if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist' && file !== 'src' && file !== 'assets' && file !== 'public' && file !== 'partials') {
      items.push(...scanDirectory(filePath, baseDir))
    } else if (file.endsWith('.html') && !file.includes('index-') && file !== '404.html') {
      try {
        const content = readFileSync(filePath, 'utf-8')
        items.push(...extractTextContent(content, filePath.replace(baseDir, '')))
      } catch (error) {
        console.error(`Error reading ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  })

  return items
}

function generateAuditReport(items: ContentItem[]): ContentAudit {
  const byRegion = {
    nz: 0,
    au: 0,
    both: 0
  }

  const byType: Record<string, number> = {}
  const byPage: Record<string, number> = {}

  items.forEach((item) => {
    if (item.region === 'nz') {
      byRegion.nz++
    } else if (item.region === 'au') {
      byRegion.au++
    } else {
      byRegion.both++
    }

    byType[item.type] = (byType[item.type] || 0) + 1
    byPage[item.page || 'unknown'] = (byPage[item.page || 'unknown'] || 0) + 1
  })

  return {
    totalFiles: new Set(items.map((i) => i.file)).size,
    totalContentItems: items.length,
    byRegion,
    byType,
    byPage,
    items
  }
}

function main(): void {
  console.log('📋 Auditing content from HTML files...\n')

  const baseDir = process.cwd()
  const items: ContentItem[] = []

  items.push(...scanDirectory(baseDir, baseDir))

  if (items.length === 0) {
    console.log('❌ No HTML files found to audit')
    process.exit(1)
  }

  const audit = generateAuditReport(items)

  const reportPath = join(baseDir, 'docs', 'CONTENT_AUDIT.json')
  writeFileSync(reportPath, JSON.stringify(audit, null, 2), 'utf-8')

  console.log('✅ Content audit complete!\n')
  console.log(`📊 Summary:`)
  console.log(`   Total files: ${audit.totalFiles}`)
  console.log(`   Total content items: ${audit.totalContentItems}`)
  console.log(`   NZ content: ${audit.byRegion.nz}`)
  console.log(`   AU content: ${audit.byRegion.au}`)
  console.log(`\n📝 Content types:`)
  Object.entries(audit.byType).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`)
  })
  console.log(`\n📄 Top pages by content:`)
  const sortedPages = Object.entries(audit.byPage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
  sortedPages.forEach(([page, count]) => {
    console.log(`   ${page}: ${count} items`)
  })
  console.log(`\n💾 Full audit saved to: docs/CONTENT_AUDIT.json`)
}

main()
