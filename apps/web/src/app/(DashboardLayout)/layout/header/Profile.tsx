'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import * as profileData from './Data'
import SimpleBar from 'simplebar-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const Profile = () => {
  const { logout, user } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

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
              alt={user ? `Foto de perfil de ${user.name}` : 'Foto de perfil'}
              height={36}
              width={36}
              className='rounded-full object-cover'
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='end'
          className='w-[280px] rounded-xl border border-border pb-3 pt-1'>
          {user && (
            <div className='border-b border-border px-3 py-3'>
              <p className='truncate text-sm font-semibold text-foreground'>{user.name}</p>
              <p className='mt-0.5 truncate text-xs text-muted-foreground'>{user.email}</p>
            </div>
          )}
          <SimpleBar>
            {profileData.profileDD.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={item.url}
                  className='group/link flex min-h-11 w-full items-center px-3 py-1.5 hover:bg-secondary hover:text-interactive'>
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

          <DropdownMenuSeparator className='my-1' />

          <div className='px-3'>
            <Button variant='outline' className='w-full rounded-md' onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Profile
