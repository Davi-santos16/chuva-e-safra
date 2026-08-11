import Link from 'next/link'
import { Icon } from '../LandingIcon'
import { Button } from '@/components/ui/button'
import { RequestAccessButton } from '../RequestAccessButton'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#084C68] py-20 text-white sm:py-28">
      <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_10%_20%,white_0_1px,transparent_2px)] [background-size:28px_28px]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Icon
          icon="solar:waterdrops-linear"
          className="mx-auto h-11 w-11 text-[#75B84B]"
          aria-hidden="true"
        />
        <h2 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] text-white">
          Informação que cai como chuva e cresce como safra.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
          Faça parte de uma plataforma criada para aproximar dados, território e
          decisões agrícolas no Ceará.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <RequestAccessButton className="h-12 bg-[#75B84B] px-6 text-[#0B2F3A] hover:bg-[#75B84B]/90" />
          <Button
            variant="outline"
            className="h-12 border-white/35 px-6 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/login">Entrar na plataforma</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
