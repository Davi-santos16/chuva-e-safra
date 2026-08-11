import Link from 'next/link'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import SidebarContent from './Sidebaritems'
import SimpleBar from 'simplebar-react'
import { Icon } from '@iconify/react'
import FullLogo from '../shared/logo/FullLogo'
import {
  AMLogo,
  AMMenu,
  AMMenuItem,
  AMSidebar,
  AMSubmenu,
} from 'tailwind-sidebar'
import 'tailwind-sidebar/styles.css'

const renderSidebarItems = (
  items: any[],
  currentPath: string,
  onClose?: () => void,
  isSubItem: boolean = false
) => {
  return items.map((item, index) => {
    const isSelected = currentPath === item?.url
    const IconComp = item.icon || null

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={21} width={21} aria-hidden='true' />
    ) : (
      <Icon
        icon='ri:checkbox-blank-circle-line'
        height={9}
        width={9}
        aria-hidden='true'
      />
    )

    // Heading
    if (item.heading) {
      return (
        <div className='mb-1' key={item.heading}>
          <AMMenu
            subHeading={item.heading}
            ClassName='hide-menu leading-21 text-sidebar-foreground/65 font-semibold uppercase text-xs tracking-wide'
          />
        </div>
      )
    }

    // Submenu
    if (item.children?.length) {
      return (
        <AMSubmenu
          key={item.id}
          icon={iconElement}
          title={item.name}
          ClassName='mt-0.5 text-sidebar-foreground/80'>
          {renderSidebarItems(item.children, currentPath, onClose, true)}
        </AMSubmenu>
      )
    }

    // Regular menu item
    const itemClassNames = isSubItem
      ? 'mt-0.5 text-sidebar-foreground/80 !px-1.5'
      : 'mt-0.5 text-sidebar-foreground/80'

    return (
      <div onClick={onClose} key={index}>
        <AMMenuItem
          key={item.id}
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target='_self'
          badge={false}
          disabled={item.disabled}
          component={Link}
          className={`${itemClassNames}`}>
          <span className='truncate flex-1'>{item.title || item.name}</span>
        </AMMenuItem>
      </div>
    )
  })
}

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const isMobile = Boolean(onClose)

  // Only allow "light" or "dark" for AMSidebar
  const sidebarMode = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <AMSidebar
      collapsible='none'
      animation={true}
      showProfile={false}
      width={isMobile ? 'min(270px, 85vw)' : '270px'}
      showTrigger={false}
      mode={sidebarMode}
      themeColor='var(--primary)'
      themeSecondaryColor='var(--success)'
      textColor='var(--sidebar-foreground)'
      className={`${
        isMobile ? 'relative border-0' : 'fixed inset-y-0 left-0 border-e border-sidebar-border'
      } z-10 h-dvh bg-sidebar text-sidebar-foreground`}>
      {/* Logo */}
      <div className='brand-logo flex min-h-[72px] items-center overflow-hidden border-b border-sidebar-border px-6'>
        <AMLogo component={Link} href='/' img=''>
          <FullLogo surface='dark' className='w-[184px]' priority />
        </AMLogo>
      </div>

      {/* Sidebar items */}

      <SimpleBar className='h-[calc(100dvh-72px)]'>
        <div className='px-6 py-4'>
          {SidebarContent.map((section, index) => (
            <div key={index}>
              {renderSidebarItems(
                [
                  ...(section.heading ? [{ heading: section.heading }] : []),
                  ...(section.children || []),
                ],
                pathname,
                onClose
              )}
            </div>
          ))}

        </div>
      </SimpleBar>
    </AMSidebar>
  )
}

export default SidebarLayout
