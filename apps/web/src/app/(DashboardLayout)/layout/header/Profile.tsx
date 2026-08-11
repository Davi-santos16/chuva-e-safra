'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import * as profileData from './Data'
import SimpleBar from 'simplebar-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const Profile = () => {
  return (
    <div className='group/menu relative shrink-0'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            aria-label='Abrir menu do perfil'
            title='Perfil'
            className='inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
            <Image
              src='/images/profile/user-1.jpg'
              alt='Foto de perfil'
              height={36}
              width={36}
              className='rounded-full object-cover'
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='end'
          className='w-[calc(100vw-2rem)] rounded-xl border border-border pb-4 pt-2 sm:w-[220px]'>
          <SimpleBar>
            {profileData.profileDD.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={item.url}
                  className='group/link flex min-h-11 w-full items-center justify-between px-4 py-2 hover:bg-secondary hover:text-interactive'>
                  <div className='flex items-center gap-3 w-full'>
                    <Icon
                      icon={item.icon}
                      aria-hidden='true'
                      className='text-lg text-muted-foreground group-hover/link:text-interactive'
                    />
                    <h5 className='mb-0 font-sans text-sm font-medium text-muted-foreground group-hover/link:text-interactive'>
                      {item.title}
                    </h5>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </SimpleBar>

          <DropdownMenuSeparator className='my-2' />

          <div className='px-4'>
            <Button variant='outline' asChild className='w-full rounded-md'>
              <Link href='/auth/login'>Logout</Link>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Profile
