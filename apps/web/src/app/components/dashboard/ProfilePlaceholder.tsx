import Link from 'next/link'
import { Icon } from '@/app/components/landing/LandingIcon'
import { Button } from '@/components/ui/button'
import CardBox from '../shared/CardBox'

export function ProfilePlaceholder({ title, icon }: { title: string; icon: string }) {
  return <div className='flex min-h-[calc(100dvh-140px)] items-center justify-center'><CardBox className='w-full max-w-2xl text-center'><span className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-interactive'><Icon icon={icon} width={30} aria-hidden='true' /></span><p className='mt-6 text-sm font-bold uppercase tracking-[0.15em] text-interactive'>Protótipo demonstrativo</p><h1 className='mt-3 text-3xl'>Dashboard — {title}</h1><p className='mx-auto mt-4 max-w-lg text-muted-foreground'>Esta área será implementada em uma próxima etapa. O redirecionamento demonstra a entrada específica para o perfil selecionado.</p><Button asChild className='mt-7'><Link href='/'>Voltar para a página inicial</Link></Button></CardBox></div>
}
