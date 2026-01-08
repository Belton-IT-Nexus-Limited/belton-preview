import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

interface TranslationIssue {
  type: 'missing' | 'empty' | 'mismatch' | 'warning'
  namespace: string
  key: string
  region?: 'nz' | 'au'
  message: string
}

function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  
  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value as Record<string, unknown>, fullKey))
    } else {
      keys.push(fullKey)
    }
  })
  
  return keys
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = obj
  
  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  
  return current
}

function validateTranslations(): TranslationIssue[] {
  const issues: TranslationIssue[] = []
  const localesDir = join(process.cwd(), 'src', 'i18n', 'locales')
  
  if (!existsSync(localesDir)) {
    issues.push({
      type: 'missing',
      namespace: 'all',
      key: 'locales',
      message: 'Locales directory not found'
    })
    return issues
  }

  const regions = ['en-NZ', 'en-AU']
  const namespaces: Record<string, string[]> = {}

  regions.forEach((region) => {
    const regionDir = join(localesDir, region)
    if (!existsSync(regionDir)) {
      issues.push({
        type: 'missing',
        namespace: 'all',
        key: region,
        region: region === 'en-NZ' ? 'nz' : 'au',
        message: `Region directory not found: ${region}`
      })
      return
    }

    const files = readdirSync(regionDir, { recursive: true })
    const jsonFiles = files.filter((f) => f.endsWith('.json'))

    jsonFiles.forEach((file) => {
      const namespace = file.replace('.json', '').replace(/\//g, '.')
      if (!namespaces[namespace]) {
        namespaces[namespace] = []
      }
      namespaces[namespace].push(region)
    })
  })

  Object.entries(namespaces).forEach(([namespace, regions]) => {
    if (regions.length !== 2) {
      issues.push({
        type: 'mismatch',
        namespace,
        key: 'namespace',
        message: `Namespace exists in ${regions.length} region(s), expected 2`
      })
      return
    }

    const nzPath = join(localesDir, 'en-NZ', namespace.replace(/\./g, '/') + '.json')
    const auPath = join(localesDir, 'en-AU', namespace.replace(/\./g, '/') + '.json')

    try {
      const nzContent = JSON.parse(readFileSync(nzPath, 'utf-8'))
      const auContent = JSON.parse(readFileSync(auPath, 'utf-8'))

      const nzKeys = getAllKeys(nzContent)
      const auKeys = getAllKeys(auContent)

      const allKeys = new Set([...nzKeys, ...auKeys])

      allKeys.forEach((key) => {
        const nzValue = getNestedValue(nzContent, key)
        const auValue = getNestedValue(auContent, key)

        if (nzValue === undefined) {
          issues.push({
            type: 'missing',
            namespace,
            key,
            region: 'nz',
            message: `Missing key in NZ: ${key}`
          })
        } else if (typeof nzValue === 'string' && nzValue.trim() === '' && !key.includes('phone') && !key.includes('stats') && !key.includes('services') && !key.includes('approach') && !key.includes('testimonial') && !key.includes('beyond')) {
          issues.push({
            type: 'warning',
            namespace,
            key,
            region: 'nz',
            message: `Empty value in NZ (may be intentional for region-specific content): ${key}`
          })
        }

        if (auValue === undefined) {
          issues.push({
            type: 'missing',
            namespace,
            key,
            region: 'au',
            message: `Missing key in AU: ${key}`
          })
        } else if (typeof auValue === 'string' && auValue.trim() === '' && !key.includes('whoWeHelp') && !key.includes('whatWeDo') && !key.includes('howWeWork') && !key.includes('trust')) {
          issues.push({
            type: 'warning',
            namespace,
            key,
            region: 'au',
            message: `Empty value in AU (may be intentional for region-specific content): ${key}`
          })
        }
      })
    } catch (error) {
      issues.push({
        type: 'missing',
        namespace,
        key: 'file',
        message: `Error reading translation files: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }
  })

  return issues
}

function main(): void {
  console.log('🔍 Validating translations...\n')

  const issues = validateTranslations()

  const errors = issues.filter((i) => i.type === 'missing' || i.type === 'empty')
  const warnings = issues.filter((i) => i.type === 'warning' || i.type === 'mismatch')

  if (errors.length > 0) {
    console.log('❌ Errors found:')
    errors.forEach((issue) => {
      console.log(`   - ${issue.message} (${issue.namespace}${issue.key ? `.${issue.key}` : ''}${issue.region ? ` [${issue.region}]` : ''})`)
    })
    console.log('')
  }

  if (warnings.length > 0) {
    console.log('⚠️  Warnings:')
    warnings.forEach((issue) => {
      console.log(`   - ${issue.message} (${issue.namespace}${issue.key ? `.${issue.key}` : ''})`)
    })
    console.log('')
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All translations are valid!')
    console.log('\n💡 Tips:')
    console.log('   - Review content for typos and consistency')
    console.log('   - Test special characters (quotes, apostrophes, etc.)')
    console.log('   - Verify formatting is preserved')
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
