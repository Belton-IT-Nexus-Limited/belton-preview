export const IMAGE_PATHS = {
  logo: '/images/belton-logo-white-red.png',
  partnerLogo: '/images/microsoft-partner-logo.png',
  beltonHouse: '/images/belton-house.webp',
  favicon: '/images/favicon-32x32.png'
} as const

export type ImageKey = keyof typeof IMAGE_PATHS

export function getImagePath(key: ImageKey): string {
  return IMAGE_PATHS[key]
}
