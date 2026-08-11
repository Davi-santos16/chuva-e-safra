import Image from 'next/image'
import { Icon } from '../LandingIcon'
import { SectionHeading } from './SectionHeading'

const steps = [
  ['01', 'Organiza o que já existe', 'Dados de chuva, cultivo e território ganham uma mesma leitura.'],
  ['02', 'Encontra relações no campo', 'O comportamento climático passa a ser visto junto da safra.'],
  ['03', 'Mostra o que pede atenção', 'Indicadores e comparações ajudam a perceber mudanças relevantes.'],
  ['04', 'Apoia a próxima decisão', 'Cada perfil consulta uma visão clara para agir no seu contexto.'],
]

export function HowItWorks() {
  return (
    <section id='como-funciona' className='bg-secondary/45 py-20 sm:py-28'>
      <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-12 lg:grid-cols-[.84fr_1.16fr] lg:items-center'>
          <div className='relative mx-auto w-full max-w-[510px] lg:mx-0'>
            <div className='relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border shadow-lg'>
              <Image src='/images/landing/login-ceara.webp' alt='Milho no Ceará recebendo chuva suave' fill sizes='(max-width: 1024px) 100vw, 42vw' className='object-cover' />
              <div className='absolute inset-0 bg-gradient-to-t from-[#084C68]/75 via-transparent to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8'>
                <Icon icon='solar:waterdrops-linear' width={28} aria-hidden='true' />
                <p className='mt-3 font-heading text-xl'>O território é o ponto de partida.</p>
                <p className='mt-2 text-sm leading-relaxed text-white/75'>A tecnologia organiza sinais, mas a decisão continua próxima de quem conhece o campo.</p>
              </div>
            </div>
            <div className='absolute -right-3 top-8 rounded-xl border border-border bg-card px-4 py-3 shadow-md sm:-right-7'>
              <span className='block text-xs text-muted-foreground'>Leitura integrada</span>
              <strong className='font-heading text-sm'>clima + produção</strong>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow='Como funciona' title='Menos tela para decifrar. Mais contexto para decidir.' description='Em vez de espalhar indicadores, a plataforma acompanha uma sequência natural: entender o território, cruzar os sinais e transformar isso em uma leitura útil.' />
            <ol className='mt-9 border-t border-border'>
              {steps.map(([number, title, text], index) => (
                <li key={number} className='grid grid-cols-[48px_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[72px_1fr_auto] sm:gap-6'>
                  <span className='font-heading text-lg text-interactive'>{number}</span>
                  <div>
                    <h3 className='text-lg'>{title}</h3>
                    <p className='mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground'>{text}</p>
                  </div>
                  <Icon icon={index === 3 ? 'solar:compass-square-linear' : 'solar:arrow-right-linear'} width={20} className='hidden self-center text-muted-foreground sm:block' aria-hidden='true' />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
