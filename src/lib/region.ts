import { type Region, REGIONS } from './constants'

export function detectRegionFromPath(pathname: string): Region {
  if (pathname.startsWith('/au')) {
    return REGIONS.AU
  }
  return REGIONS.NZ
}

export function getRegionFromStorage(): Region | null {
  try {
    const stored = localStorage.getItem('belton-region')
    if (stored === REGIONS.AU || stored === REGIONS.NZ) {
      return stored
    }
    return null
  } catch {
    return null
  }
}

export function setRegionInStorage(region: Region): void {
  try {
    localStorage.setItem('belton-region', region)
  } catch {
    // Ignore storage errors
  }
}
