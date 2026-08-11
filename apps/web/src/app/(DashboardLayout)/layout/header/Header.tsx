'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import Profile from './Profile'
import Notifications from './Notifications'
import SidebarLayout from '../sidebar/Sidebar'
import FullLogo from '../shared/logo/FullLogo'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [isSticky, setIsSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const isDark = resolvedTheme === 'dark'
  const themeLabel = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  return (
    <>
      <header
        className={`app-header sticky top-0 z-40 border-b border-border bg-background ${
          isSticky ? 'shadow-sm' : 'shadow-none'
        }`}>
        <nav
          aria-label='Navegação principal'
          className='flex min-h-[72px] max-w-full! items-center justify-between gap-1 px-4 py-3 md:px-6 xl:px-8'>
          {/* Mobile Toggle Icon */}
          <button
            type='button'
            aria-label='Abrir menu de navegação'
            aria-controls='mobile-navigation'
            aria-expanded={isOpen}
            onClick={() => {
              setIsOpen(true)
            }}
            className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 xl:hidden'>
            <Icon
              icon='tabler:menu-2'
              height={20}
              width={20}
              aria-hidden='true'
            />
          </button>

          <Link
            href='/'
            aria-label='Ir para o início'
            className='inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 xl:hidden'>
            <FullLogo priority className='w-[140px] sm:w-[168px]' />
          </Link>

          <div className='flex shrink-0 items-center xl:hidden'>
            <button
              type='button'
              aria-label={themeLabel}
              title={themeLabel}
              className='inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              onClick={toggleMode}>
              {isDark ? (
                <Icon
                  icon='solar:sun-bold-duotone'
                  width='20'
                  aria-hidden='true'
                />
              ) : (
                <Icon icon='tabler:moon' width='20' aria-hidden='true' />
              )}
            </button>

            <Notifications />

            {/* Profile Dropdown */}
            <Profile />
          </div>

          <div className='hidden w-full items-center justify-between xl:flex'>
            <div className='flex items-center gap-2'>
              {/* Search Icon */}

              <div className='relative w-64'>
                <Icon
                  icon='solar:magnifer-linear'
                  width={18}
                  height={18}
                  aria-hidden='true'
                  className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                />
                <Input
                  type='text'
                  aria-label='Pesquisar'
                  placeholder='Search...'
                  className='h-11 rounded-xl pl-10'
                />
              </div>
            </div>
            <div className='flex w-full items-center justify-end'>
              <div className='flex items-center'>
                {/* ✅ Dark/Light Toggle */}
                <button
                  type='button'
                  aria-label={themeLabel}
                  title={themeLabel}
                  className='inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  onClick={toggleMode}>
                  {isDark ? (
                    <Icon
                      icon='solar:sun-bold-duotone'
                      width='20'
                      aria-hidden='true'
                    />
                  ) : (
                    <Icon icon='tabler:moon' width='20' aria-hidden='true' />
                  )}
                </button>

                <Notifications />

                {/* Profile Dropdown */}
                <Profile />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          id='mobile-navigation'
          side='left'
          className='w-[270px] max-w-[85vw] overflow-hidden border-sidebar-border bg-sidebar p-0 text-sidebar-foreground [&>button:last-child]:hidden'>
          <SheetTitle className='sr-only'>Navegação</SheetTitle>
          <SheetClose asChild>
            <button
              type='button'
              aria-label='Fechar menu de navegação'
              className='absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-sidebar-foreground transition-colors hover:bg-sidebar-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar'>
              <Icon icon='tabler:x' width={20} aria-hidden='true' />
            </button>
          </SheetClose>
          <SidebarLayout onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Header
