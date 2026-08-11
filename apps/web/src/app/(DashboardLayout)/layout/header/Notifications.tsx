'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import * as MessagesData from './Data'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const Notifications = () => {
  return (
    <div className='group/menu relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            aria-label='Abrir notificações'
            title='Notificações'
            className='relative inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
            <Icon
              icon='tabler:bell-ringing'
              height={20}
              aria-hidden='true'
            />
            <span
              aria-hidden='true'
              className='absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background'
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='end'
          className='w-[calc(100vw-2rem)] rounded-xl border border-border py-4 sm:w-[320px]'>
          {/* Header */}
          <div className='flex items-center px-6 justify-between'>
            <h3 className='mb-0 text-lg font-semibold text-foreground'>Notification</h3>
          </div>

          {/* Scrollable content */}
          <SimpleBar className='max-h-80 mt-3'>
            {MessagesData.Notifications.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href='#'
                  className='group/link flex min-h-11 w-full items-center justify-between px-6 py-2 hover:bg-secondary hover:text-interactive'>
                  <div className='flex items-center'>
                    <div className='ps-0'>
                      <h5 className='mb-1 font-sans text-sm font-medium group-hover/link:text-interactive'>
                        {item.title}
                      </h5>
                      <span className='block truncate text-xs text-muted-foreground'>
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </SimpleBar>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Notifications
