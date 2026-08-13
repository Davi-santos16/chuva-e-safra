'use client'

import Header from './layout/header/Header'
import Sidebar from './layout/sidebar/Sidebar'
import { RouteGuard } from '@/components/auth/route-guard'
import { ALL_AUTHENTICATED_ROLES } from '@/lib/auth/types'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RouteGuard allowedRoles={ALL_AUTHENTICATED_ROLES}>
    <div className='flex min-h-dvh w-full bg-background'>
      {/* Header/sidebar */}
      <div className='hidden xl:block'>
        <Sidebar />
      </div>
      <div className='page-wrapper flex min-h-dvh min-w-0 flex-1'>
        <div className='body-wrapper flex min-w-0 flex-1 flex-col bg-background'>
          {/* Top Header */}
          <Header />
          {/* Body Content */}
          <main
            id='main-content'
            className='container mx-auto w-full p-4 md:p-6 xl:p-8'>
            {children}
          </main>
        </div>
      </div>
    </div>
    </RouteGuard>
  )
}
