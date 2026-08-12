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
  {
    heading: 'Exemplos',
    children: [
      {
        id: 'tabela',
        name: 'Tabela',
        icon: 'solar:server-linear',
        url: '/utilities/table',
      },
      {
        id: 'tipografia',
        name: 'Tipografia',
        icon: 'solar:text-circle-outline',
        url: '/utilities/typography',
      },
      {
        id: 'formulario',
        name: 'Formulário',
        icon: 'solar:document-add-linear',
        url: '/utilities/form',
      },
      {
        id: 'sombras',
        name: 'Sombras',
        icon: 'solar:airbuds-case-charge-outline',
        url: '/utilities/shadow',
      },
      {
        id: 'icones',
        name: 'Ícones',
        icon: 'solar:palette-linear',
        url: '/icons/tabler',
      },
    ],
  },
]

export default sidebarContent
