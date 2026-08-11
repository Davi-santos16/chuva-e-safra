'use client'

import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import CardBox from '../shared/CardBox'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Register = () => {
  return (
    <main className='flex min-h-dvh w-full items-center justify-center bg-background px-4 py-8 sm:px-6'>
      <section className='w-full max-w-[450px]' aria-label='Criação de conta'>
        <CardBox className='gap-0 !rounded-2xl !border-border'>
            <div className='flex justify-center mb-4'>
              <FullLogo priority className='w-[200px] max-w-full' />
            </div>
            <p className='mb-6 text-center text-sm text-muted-foreground'>
              Crie sua conta
            </p>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name1' className='font-semibold'>
                  Nome
                </Label>
              </div>
              <Input
                id='name1'
                type='text'
                placeholder='Digite seu nome'
                required
              />
            </div>
            <div className='mt-6'>
              <div className='mb-2 block'>
                <Label htmlFor='email1' className='font-semibold'>
                  Email
                </Label>
              </div>
              <Input
                id='email1'
                type='email'
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
            <Button className='w-full mt-6' asChild>
              <Link href='/'>Cadastrar</Link>
            </Button>
            <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
              <p className='text-base font-medium text-muted-foreground'>
                Já tem uma conta?
              </p>
              <Link
                href='/auth/login'
                className='text-sm font-medium text-interactive hover:text-interactive-hover'>
                Entrar
              </Link>
            </div>
        </CardBox>
      </section>
    </main>
  )
}
