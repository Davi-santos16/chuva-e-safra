'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/app/components/landing/LandingIcon'
import FullLogo from '@/app/(DashboardLayout)/layout/shared/logo/FullLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RequestAccessButton } from '@/app/components/landing/RequestAccessButton'

export const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setMessage('Preencha e-mail ou CPF e senha para continuar no protótipo.')
      return
    }
    setMessage('Acesso demonstrativo autorizado. Preparando seu painel…')
    setLoading(true)
    window.setTimeout(() => router.push('/produtor/dashboard'), 850)
  }

  return (
    <main className='min-h-dvh bg-card'>
      <div className='grid min-h-dvh w-full overflow-hidden bg-card lg:grid-cols-[1.05fr_.95fr]'>
        <section className='relative hidden min-h-[760px] overflow-hidden bg-[#084C68] lg:flex lg:flex-col lg:justify-between' aria-label='Apresentação Chuva e Safra'>
          <Image src='/images/landing/login-ceara.webp' alt='Plantação de milho no Ceará durante uma chuva leve' fill priority sizes='52vw' className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-b from-[#062832]/80 via-[#084C68]/30 to-[#062832]/90' />
          <div className='relative z-10 p-10 xl:p-14'><FullLogo surface='dark' className='w-[210px]' priority /></div>
          <div className='relative z-10 max-w-2xl p-10 xl:p-14'>
            <p className='mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#75B84B]'>Inteligência para o território</p>
            <h1 className='text-[clamp(2.25rem,4vw,4rem)] leading-tight text-white'>Dados do campo transformados em decisões mais seguras.</h1>
            <p className='mt-5 max-w-xl text-lg leading-relaxed text-white/70'>Acompanhe chuvas, safras, produtividade e indicadores do seu território em uma única plataforma.</p>
          </div>
        </section>

        <section className='flex items-center justify-center px-4 py-8 sm:px-10 lg:px-12 xl:px-20' aria-label='Acesso à plataforma'>
          <div className='w-full max-w-[520px]'>
            <div className='mb-8 flex items-center justify-between gap-4 lg:hidden'><FullLogo className='w-[176px]' priority /><Link href='/' className='flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary' aria-label='Voltar ao início'><Icon icon='tabler:x' width={20} aria-hidden='true' /></Link></div>
            <Link href='/' className='mb-8 hidden w-fit items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-interactive lg:inline-flex'><Icon icon='tabler:arrow-left' width={18} aria-hidden='true' />Voltar para o início</Link>
            <h2 className='text-[clamp(2rem,4vw,2.8rem)]'>Bem-vindo de volta</h2>
            <p className='mt-2 text-muted-foreground'>Acesse sua conta no Chuva &amp; Safra.</p>

            <form className='mt-8' onSubmit={handleSubmit} noValidate>
              <div><Label htmlFor='login-identifier' className='font-semibold'>E-mail ou CPF</Label><Input id='login-identifier' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='danileilaleila@gmail.com' className='mt-2' autoComplete='username' required /></div>
              <div className='mt-5'><Label htmlFor='login-password' className='font-semibold'>Senha</Label><div className='relative mt-2'><Input id='login-password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Digite sua senha' type={showPassword ? 'text' : 'password'} className='pr-12' autoComplete='current-password' required /><button type='button' onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'} className='absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'><Icon icon={showPassword ? 'tabler:eye-off' : 'tabler:eye'} width={19} aria-hidden='true' /></button></div></div>

              <p role='status' aria-live='polite' className={`mt-4 min-h-5 text-sm ${message.startsWith('Preencha') ? 'text-destructive' : 'text-muted-foreground'}`}>{message}</p>
              <Button type='submit' className='mt-2 h-12 w-full text-base' disabled={loading}>{loading ? <><Icon icon='tabler:loader-2' className='animate-spin motion-reduce:animate-none' width={19} aria-hidden='true' />Entrando…</> : 'Entrar'}</Button>
            </form>

            <div className='mt-7 border-t border-border pt-6 text-center'><p className='text-sm text-muted-foreground'>É produtor e ainda não tem acesso?</p><RequestAccessButton variant='outline' className='mt-3 w-full'>Solicitar acesso de produtor</RequestAccessButton></div>
          </div>
        </section>
      </div>
    </main>
  )
}
