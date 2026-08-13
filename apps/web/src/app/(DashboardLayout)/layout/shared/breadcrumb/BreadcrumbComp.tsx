'use client'

import CardBox from '@/app/components/shared/CardBox'
import { IconChevronRight } from '@tabler/icons-react'
import { JSX } from 'react'
import FullLogo from '../logo/FullLogo'

interface BreadCrumbType {
  subtitle?: string
  items?: unknown[]
  title: string
  children?: JSX.Element
}

const BreadcrumbComp = ({ title }: BreadCrumbType) => {
  return (
    <>
      <CardBox
        className='mb-6 overflow-hidden bg-secondary py-4 !rounded-2xl !border-border !shadow-none'>
        <div className='grid grid-cols-12 items-center gap-4 md:gap-6'>
          <div className='col-span-12 sm:col-span-9'>
            <h4 className='mb-2 text-xl font-semibold text-foreground'>
              {title}
            </h4>
            <ol
              className='flex flex-wrap items-center'
              aria-label='Breadcrumb'>
              <li className='flex items-center'>
                <a
                  className='rounded-sm text-sm leading-none text-muted-foreground transition-colors hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  href='@@webRoot/main/index.html'>
                  Home
                </a>
              </li>
              <li aria-hidden='true' className='mx-2 flex items-center'>
                <IconChevronRight
                  size={16}
                  className='text-muted-foreground'
                />
              </li>
              <li
                className='flex items-center text-sm font-medium leading-none text-foreground'
                aria-current='page'>
                {title}
              </li>
            </ol>
          </div>
          <div
            aria-hidden='true'
            className='col-span-3 hidden justify-center sm:flex'>
            <FullLogo compact className='w-20 md:w-24' />
          </div>
        </div>
      </CardBox>
    </>
  )
}

export default BreadcrumbComp
