'use client'

import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import CardBox from '../shared/CardBox'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Login = () => {
  return (
    <main className='flex min-h-dvh w-full items-center justify-center bg-background px-4 py-8 sm:px-6'>
      <section className='w-full max-w-[450px]' aria-label='Acesso à conta'>
        <CardBox className='gap-0 !rounded-2xl !border-border'>
            <div className='flex justify-center mb-4'>
              <FullLogo priority className='w-[200px] max-w-full' />
            </div>
            <p className='mb-6 text-center text-sm text-muted-foreground'>
              Acesse sua conta
            </p>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='username1' className='font-semibold'>
                  E-mail
                </Label>
              </div>
              <Input
                id='username1'
                type='text'
                placeholder='Digite seu e-mail'
                required
              />
            </div>
            <div className='mt-6'>
              <div className='mb-2 block'>
                <Label htmlFor='password1' className='font-semibold'>
                  Senha
                </Label>
              </div>
              <Input
                id='password1'
                type='password'
                placeholder='Digite sua senha'
                required
              />
            </div>
            <div className='flex flex-wrap gap-6 items-center justify-between my-6'>
              <div className='flex items-center gap-2'>
                <Checkbox id='remember' checked />
                <Label
                  className='text-sm font-normal text-muted-foreground'
                  htmlFor='remember'>
                  Lembrar neste dispositivo
                </Label>
              </div>
              <Link
                href='#'
                className='text-sm font-medium text-interactive hover:text-interactive-hover'>
                Esqueceu a senha?
              </Link>
            </div>
            <Button className='w-full' asChild>
              <Link href='/'>Entrar</Link>
            </Button>
            <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
              <p className='text-base font-medium text-muted-foreground'>
                Ainda não tem conta?
              </p>
              <Link
                href='/auth/register'
                className='text-sm font-medium text-interactive hover:text-interactive-hover'>
                Criar conta
              </Link>
            </div>
        </CardBox>
      </section>
    </main>
  )
}
