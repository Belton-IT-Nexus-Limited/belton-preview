#!/usr/bin/env node

import { readFileSync } from 'fs'
import { join } from 'path'

const statsPath = join(process.cwd(), 'dist', 'stats.html')

try {
  const stats = readFileSync(statsPath, 'utf-8')
  console.log('Bundle analysis available at: dist/stats.html')
  console.log('Open it in your browser to view the interactive bundle visualization.')
} catch {
  console.log('Bundle stats not found. Run "pnpm build" first to generate stats.html')
  process.exit(1)
}
