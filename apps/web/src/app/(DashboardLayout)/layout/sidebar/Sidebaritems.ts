import type { UserRole } from '@/lib/auth/types'

export interface MenuItem {
  heading?: string
  name?: string
  icon?: string
  id?: string
  url?: string
  children?: MenuItem[]
  allowedRoles?: UserRole[]
}

const sidebarContent: MenuItem[] = [
  {
    heading: 'Principal',
    children: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'solar:widget-add-line-duotone',
        url: '/produtor/dashboard',
      },
      {
        id: 'perfil',
        name: 'Perfil',
        icon: 'solar:user-circle-linear',
        url: '/user-profile',
      },
    ],
  },
]

export default sidebarContent
