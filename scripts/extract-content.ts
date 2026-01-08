import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

interface ContentMapping {
  page: string
  region: 'nz' | 'au' | 'both'
  namespace: string
  key: string
  content: string
  extracted: boolean
  notes?: string
}

function extractPageContent(filePath: string, region: 'nz' | 'au'): ContentMapping[] {
  const mappings: ContentMapping[] = []
  
  if (!existsSync(filePath)) {
    return mappings
  }

  try {
    const html = readFileSync(filePath, 'utf-8')
    const fileName = filePath.split('/').pop()?.replace('.html', '') || ''

    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    if (titleMatch) {
      mappings.push({
        page: fileName,
        region,
        namespace: `pages/${fileName}`,
        key: 'title',
        content: titleMatch[1].replace('| Belton IT Nexus', '').trim(),
        extracted: false
      })
    }

    const metaDescMatch = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']+)["']/i)
    if (metaDescMatch) {
      mappings.push({
        page: fileName,
        region,
        namespace: `pages/${fileName}`,
        key: 'description',
        content: metaDescMatch[1],
        extracted: false
      })
    }

    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || []
    h1Matches.forEach((match, index) => {
      const content = match.replace(/<[^>]+>/g, '').trim()
      if (content) {
        mappings.push({
          page: fileName,
          region,
          namespace: `pages/${fileName}`,
          key: index === 0 ? 'title' : `title${index + 1}`,
          content,
          extracted: false
        })
      }
    })

    const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []
    h2Matches.forEach((match, index) => {
      const content = match.replace(/<[^>]+>/g, '').trim()
      if (content) {
        mappings.push({
          page: fileName,
          region,
          namespace: `pages/${fileName}`,
          key: `section${index + 1}.title`,
          content,
          extracted: false
        })
      }
    })

    const paragraphMatches = html.match(/<p[^>]*class=["']([^"']+)["'][^>]*>(.*?)<\/p>/gi) || []
    paragraphMatches.forEach((match, index) => {
      const content = match.replace(/<[^>]+>/g, '').trim()
      if (content && content.length > 10) {
        const classMatch = match.match(/class=["']([^"']+)["']/)
        const className = classMatch ? classMatch[1] : 'default'
        mappings.push({
          page: fileName,
          region,
          namespace: `pages/${fileName}`,
          key: `paragraph${index + 1}`,
          content,
          extracted: false,
          notes: `Class: ${className}`
        })
      }
    })
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return mappings
}

function generateContentMapping(): void {
  console.log('📝 Extracting content from HTML files...\n')

  const baseDir = process.cwd()
  const mappings: ContentMapping[] = []

  const pages = [
    { file: 'index-orb.html', region: 'nz' as const, namespace: 'pages/home' },
    { file: 'services.html', region: 'nz' as const, namespace: 'pages/services' },
    { file: 'contact.html', region: 'nz' as const, namespace: 'pages/contact' },
    { file: 'about.html', region: 'nz' as const, namespace: 'pages/about' },
    { file: 'how-we-work.html', region: 'nz' as const, namespace: 'pages/how-we-work' },
    { file: 'au/index.html', region: 'au' as const, namespace: 'pages/home' },
    { file: 'au/services.html', region: 'au' as const, namespace: 'pages/services' },
    { file: 'au/contact.html', region: 'au' as const, namespace: 'pages/contact' }
  ]

  pages.forEach(({ file, region, namespace }) => {
    const filePath = join(baseDir, file)
    const extracted = extractPageContent(filePath, region)
    extracted.forEach((mapping) => {
      mapping.namespace = namespace
      mappings.push(mapping)
    })
  })

  const outputPath = join(baseDir, 'docs', 'CONTENT_MAPPING.json')
  writeFileSync(outputPath, JSON.stringify(mappings, null, 2), 'utf-8')

  console.log(`✅ Extracted ${mappings.length} content items`)
  console.log(`💾 Content mapping saved to: docs/CONTENT_MAPPING.json`)
  console.log(`\n📋 Next steps:`)
  console.log(`   1. Review CONTENT_MAPPING.json`)
  console.log(`   2. Organize content into translation files`)
  console.log(`   3. Run validation script to check completeness`)
}

generateContentMapping()
