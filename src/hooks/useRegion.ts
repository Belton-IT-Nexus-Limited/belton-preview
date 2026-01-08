import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type Region, REGIONS } from '@/lib/constants'
import { detectRegionFromPath, getRegionFromStorage, setRegionInStorage } from '@/lib/region'

export function useRegion(): {
  region: Region
  isNZ: boolean
  isAU: boolean
  setRegion: (region: Region) => void
} {
  const location = useLocation()
  const { i18n } = useTranslation()

  const region = useMemo(() => {
    const pathRegion = detectRegionFromPath(location.pathname)
    const storedRegion = getRegionFromStorage()

    if (pathRegion) {
      if (i18n.language !== pathRegion) {
        i18n.changeLanguage(pathRegion).catch(() => {
          // Ignore language change errors
        })
      }
      setRegionInStorage(pathRegion)
      return pathRegion
    }

    if (storedRegion) {
      if (i18n.language !== storedRegion) {
        i18n.changeLanguage(storedRegion).catch(() => {
          // Ignore language change errors
        })
      }
      return storedRegion
    }

    return REGIONS.NZ
  }, [location.pathname, i18n])

  const setRegion = (newRegion: Region): void => {
    setRegionInStorage(newRegion)
    i18n.changeLanguage(newRegion).catch(() => {
      // Ignore language change errors
    })
  }

  return {
    region,
    isNZ: region === REGIONS.NZ,
    isAU: region === REGIONS.AU,
    setRegion
  }
}
