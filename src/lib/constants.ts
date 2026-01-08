export const SITE_CONFIG = {
  name: 'Belton IT Nexus',
  description: 'Managed IT and cybersecurity services',
  url: {
    nz: 'https://www.belton.co.nz',
    au: 'https://belton.com.au'
  }
} as const

export const REGIONS = {
  NZ: 'en-NZ',
  AU: 'en-AU'
} as const

export type Region = typeof REGIONS[keyof typeof REGIONS]
