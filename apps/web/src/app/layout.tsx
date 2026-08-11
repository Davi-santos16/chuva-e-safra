import React from 'react'
import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './css/globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chuva & Safra',
  description: 'Informação para apoiar decisões no campo',
  icons: {
    icon: {
      url: '/logos/simbolo-colorido-outline.svg',
      type: 'image/svg+xml',
    },
    shortcut: '/logos/simbolo-colorido-outline.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' data-scroll-behavior='smooth' suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
