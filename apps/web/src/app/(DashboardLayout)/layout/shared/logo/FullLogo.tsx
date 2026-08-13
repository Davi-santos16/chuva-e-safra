import Image from 'next/image'

import { cn } from '@/lib/utils'

interface FullLogoProps {
  className?: string
  compact?: boolean
  priority?: boolean
  surface?: 'auto' | 'light' | 'dark'
}

const logoSources = {
  horizontal: {
    light: '/logos/logo-horizontal-light.svg',
    dark: '/logos/logo-horizontal-dark.svg',
  },
  compact: {
    light: '/logos/simbolo-colorido-outline.svg',
    dark: '/logos/gota-monocromatica-branca.svg',
  },
} as const

const FullLogo = ({
  className,
  compact = false,
  priority = false,
  surface = 'auto',
}: FullLogoProps) => {
  const sources = compact ? logoSources.compact : logoSources.horizontal
  const dimensions = compact
    ? { width: 40, height: 40 }
    : { width: 180, height: 51 }
  const label = compact ? 'Símbolo Chuva & Safra' : 'Chuva & Safra'
  const baseClassName = compact ? 'w-10' : 'w-[180px] min-w-[140px]'

  if (surface !== 'auto') {
    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          baseClassName,
          className
        )}>
        <Image
          src={sources[surface]}
          alt={label}
          {...dimensions}
          priority={priority}
          className='block h-auto w-full'
          style={{ width: '100%', height: 'auto' }}
        />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        baseClassName,
        className
      )}>
      <Image
        src={sources.light}
        alt={label}
        {...dimensions}
        priority={priority}
        className='block h-auto w-full dark:hidden'
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src={sources.dark}
        alt={label}
        {...dimensions}
        priority={priority}
        className='hidden h-auto w-full dark:block'
        style={{ width: '100%', height: 'auto' }}
      />
    </span>
  )
}

export default FullLogo
