export interface SEOData {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  noindex?: boolean
  nofollow?: boolean
}

export interface SiteConfig {
  siteName: string
  siteUrl: {
    nz: string
    au: string
  }
  defaultImage: string
  twitterHandle?: string
}

import { env } from './env'

export const siteConfig: SiteConfig = {
  siteName: 'Belton IT Nexus',
  siteUrl: {
    nz: env.siteUrlNz,
    au: env.siteUrlAu
  },
  defaultImage: '/images/belton-og-image.png',
  twitterHandle: '@beltonit'
}

export function getCanonicalUrl(path: string, isAU: boolean): string {
  const baseUrl = isAU ? siteConfig.siteUrl.au : siteConfig.siteUrl.nz
  const cleanPath = path === '/' ? '' : path
  return `${baseUrl}${cleanPath}`
}

export function getAlternateUrls(path: string): { nz: string; au: string } {
  const cleanPath = path === '/' ? '' : path
  return {
    nz: `${siteConfig.siteUrl.nz}${cleanPath}`,
    au: `${siteConfig.siteUrl.au}/au${cleanPath}`
  }
}
