import Image from 'next/image'
import { Icon } from '../LandingIcon'
import { SectionHeading } from './SectionHeading'

const resources = [
  ['solar:waterdrops-linear', 'Chuva no tempo certo', 'Acompanhe volume, distribuição e regularidade sem perder a escala do município.'],
  ['solar:chart-2-linear', 'Safra em perspectiva', 'Leia produtividade, cultura e ciclos com uma comparação que faz sentido.'],
  ['solar:map-arrow-square-linear', 'Território comparável', 'Observe diferenças entre áreas para orientar diálogo e prioridade de ação.'],
]

export function FeaturesGrid() {
  return (
    <section id='recursos' className='bg-background py-20 sm:py-28'>
      <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end'>
          <SectionHeading eyebrow='Recursos' title='Dados com textura de território.' description='Recursos pensados para responder perguntas reais de campo, sem transformar a rotina em uma parede de números.' />
          <p className='max-w-xl text-base leading-relaxed text-muted-foreground lg:justify-self-end'>A plataforma reúne chuva, cultivo, histórico e risco em leituras que respeitam a diversidade de cada município cearense.</p>
        </div>

        <div className='mt-12 grid gap-5 lg:grid-cols-12'>
          <article className='relative min-h-[420px] overflow-hidden rounded-[28px] border border-border bg-[#084C68] lg:col-span-7'>
            <Image src='/images/landing/hero-ceara.webp' alt='Açude e plantação no Ceará após a chuva' fill sizes='(max-width: 1024px) 100vw, 58vw' className='object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-[#062832]/90 via-[#084C68]/15 to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8'>
              <p className='text-sm font-semibold text-[#75B84B]'>Monitoramento territorial</p>
              <h3 className='mt-2 max-w-md text-2xl text-white sm:text-3xl'>Veja a chuva no contexto de onde ela acontece.</h3>
              <div className='mt-6 flex flex-wrap gap-2 text-sm'>
                <span className='rounded-full border border-white/25 bg-white/10 px-3 py-1.5'>Municípios</span>
                <span className='rounded-full border border-white/25 bg-white/10 px-3 py-1.5'>Períodos</span>
                <span className='rounded-full border border-white/25 bg-white/10 px-3 py-1.5'>Culturas</span>
              </div>
            </div>
          </article>

          <div className='flex flex-col justify-between rounded-[28px] border border-border bg-accent p-6 sm:p-8 lg:col-span-5'>
            <div>
              <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-warning-soft text-warning-foreground'><Icon icon='solar:leaf-linear' width={24} aria-hidden='true' /></span>
              <p className='mt-7 text-sm font-semibold text-muted-foreground'>Leitura de ciclos</p>
              <h3 className='mt-2 text-2xl'>Do cultivo à produtividade, sem tirar o olho da chuva.</h3>
              <p className='mt-4 max-w-md text-sm leading-relaxed text-muted-foreground'>Cruze séries e períodos para conversar sobre mudanças com evidências, não apenas impressão.</p>
            </div>
            <div className='mt-8 flex h-24 items-end gap-2 border-b border-warning-foreground/15 pt-4'>
              {[35, 58, 44, 72, 52, 83, 67, 90, 61].map((height, index) => <span key={index} className='flex-1 rounded-t bg-success' style={{ height: `${height}%` }} />)}
            </div>
          </div>

          <div className='divide-y divide-border rounded-[24px] border border-border bg-card lg:col-span-8'>
            {resources.map(([icon, title, text], index) => (
              <article key={title} className='grid grid-cols-[48px_1fr_auto] items-center gap-4 p-5 sm:grid-cols-[56px_1fr_auto] sm:p-6'>
                <span className='flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-interactive'><Icon icon={icon} width={21} aria-hidden='true' /></span>
                <div><h3 className='text-base'>{title}</h3><p className='mt-1 text-sm text-muted-foreground'>{text}</p></div>
                <span className='font-heading text-sm text-muted-foreground'>0{index + 1}</span>
              </article>
            ))}
          </div>

          <article className='rounded-[24px] border border-border bg-secondary p-6 lg:col-span-4 lg:p-7'>
            <p className='text-sm font-semibold text-interactive'>Visões por perfil</p>
            <h3 className='mt-2 text-xl'>A mesma base, perguntas diferentes.</h3>
            <div className='mt-6 grid grid-cols-2 gap-2 text-xs font-semibold'>
              {['Produtor', 'Técnico', 'Gestor', 'Admin'].map((name, index) => <span key={name} className={`rounded-lg border px-3 py-2 ${index === 0 ? 'border-primary bg-card text-interactive' : 'border-border bg-background text-muted-foreground'}`}>{name}</span>)}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
