export interface RegionConfig {
  phone: string
  email: string
  address: string
  company: string
  portalUrl: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface Service {
  id: string
  name: string
  description: string
  href: string
  category: string
}
