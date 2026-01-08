import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useRegion } from '@/hooks/useRegion'
import { TopBar } from './TopBar'
import { Navigation } from './Navigation'
import { MobileNav } from './MobileNav'

export function Header(): JSX.Element {
  const { isAU } = useRegion()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const basePath = isAU ? '/au' : '/'
  const logoPath = '/assets/images/belton-logo-white-red.png'
  const partnerLogoPath = '/assets/images/microsoft-partner-logo.png'

  return (
    <>
      <TopBar />
      <header className="fixed top-[37px] left-0 right-0 z-[100] py-5 px-10 flex justify-between items-center bg-bg/98 backdrop-blur-sm md:top-0 md:py-4 md:px-6">
        <div className="flex items-center gap-5">
          <Link to={basePath} className="logo">
            <img
              src={logoPath}
              alt="Belton IT Nexus"
              className="h-[46px] w-auto"
              width={1620}
              height={556}
            />
          </Link>
          <span className="w-px h-[50px] bg-white/25" />
          <img
            src={partnerLogoPath}
            alt="Microsoft Partner"
            className="h-[62px] w-auto opacity-100"
          />
        </div>

        <Navigation />

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hidden md:flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
