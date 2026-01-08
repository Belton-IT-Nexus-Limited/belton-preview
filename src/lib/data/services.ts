import { type Service } from '@/types'

export const services: Service[] = [
  {
    id: 'managed-it',
    name: 'Managed IT',
    description: 'Helpdesk, devices, users, and day-to-day support',
    href: '/managed-it',
    category: 'foundation'
  },
  {
    id: 'endpoints',
    name: 'Managed Devices',
    description: 'Device management and endpoint security',
    href: '/endpoints',
    category: 'foundation'
  },
  {
    id: 'security',
    name: 'Security Operations',
    description: '24/7 monitoring and threat response',
    href: '/security',
    category: 'foundation'
  },
  {
    id: 'network-security',
    name: 'Network Security',
    description: 'Firewall, network monitoring, and security',
    href: '/network-security',
    category: 'foundation'
  },
  {
    id: 'remote-support',
    name: 'Remote Support',
    description: 'Remote assistance and troubleshooting',
    href: '/remote-support',
    category: 'foundation'
  },
  {
    id: 'microsoft365',
    name: 'Microsoft 365',
    description: 'Configured, secured, and actively managed',
    href: '/microsoft365',
    category: 'productivity'
  },
  {
    id: 'cloud',
    name: 'Cloud Solutions',
    description: 'Azure, AWS, and hybrid environments',
    href: '/cloud',
    category: 'productivity'
  },
  {
    id: 'connectivity',
    name: 'Connectivity',
    description: 'Network connectivity and internet services',
    href: '/connectivity',
    category: 'productivity'
  },
  {
    id: 'voice',
    name: 'Business VoIP',
    description: 'Voice over IP phone systems',
    href: '/voice',
    category: 'productivity'
  },
  {
    id: 'identity',
    name: 'Identity & Access',
    description: 'Identity management and access control',
    href: '/identity',
    category: 'protection'
  },
  {
    id: 'email-security',
    name: 'Email Security',
    description: 'Email protection and filtering',
    href: '/email-security',
    category: 'protection'
  },
  {
    id: 'backup',
    name: 'Backup & Recovery',
    description: 'Data backup and disaster recovery',
    href: '/backup',
    category: 'protection'
  },
  {
    id: 'compliance',
    name: 'Compliance',
    description: 'Regulatory compliance and governance',
    href: '/compliance',
    category: 'strategy'
  },
  {
    id: 'it-advisory',
    name: 'IT Advisory',
    description: 'Strategic IT consulting and planning',
    href: '/it-advisory',
    category: 'strategy'
  },
  {
    id: 'ai',
    name: 'AI & Copilot',
    description: 'AI readiness and Microsoft Copilot',
    href: '/ai',
    category: 'strategy'
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'IT projects and migrations',
    href: '/projects',
    category: 'strategy'
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technology stack recommendations',
    href: '/blueprint',
    category: 'strategy'
  },
  {
    id: 'licensing',
    name: 'Licensing',
    description: 'Software licensing management',
    href: '/licensing',
    category: 'strategy'
  },
  {
    id: 'procurement',
    name: 'Procurement',
    description: 'IT procurement and vendor management',
    href: '/procurement',
    category: 'strategy'
  }
]

export function getServicesByCategory(category: string): Service[] {
  return services.filter((service) => service.category === category)
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}
