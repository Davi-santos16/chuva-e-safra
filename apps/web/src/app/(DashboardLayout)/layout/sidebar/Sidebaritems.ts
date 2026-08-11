export interface MenuItem {
  heading?: string
  name?: string
  icon?: string
  id?: string
  url?: string
  children?: MenuItem[]
}

const sidebarContent: MenuItem[] = [
  {
    heading: 'Principal',
    children: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'solar:widget-add-line-duotone',
        url: '/',
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
    heading: 'Aplicativos',
    children: [
      {
        id: 'notas',
        name: 'Notas',
        icon: 'solar:notes-linear',
        url: '/apps/notes',
      },
      {
        id: 'tickets',
        name: 'Tickets',
        icon: 'solar:ticker-star-linear',
        url: '/apps/tickets',
      },
      {
        id: 'blog',
        name: 'Blog',
        icon: 'solar:sort-by-alphabet-linear',
        children: [
          {
            id: 'blog-posts',
            name: 'Publicações',
            url: '/apps/blog/post',
          },
        ],
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
