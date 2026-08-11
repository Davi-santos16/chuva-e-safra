import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequestAccessButton } from "./RequestAccessButton";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[820px] lg:pb-24 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_15%_20%,var(--secondary),transparent_28%),radial-gradient(circle_at_80%_75%,var(--success-soft),transparent_26%)]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="max-w-[700px] text-[clamp(2.35rem,5vw,4.6rem)] leading-[1.04] tracking-[-0.04em]">
            Da chuva à colheita, dados que ajudam o Ceará a produzir melhor.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            O Chuva &amp; Safra transforma informações climáticas e agrícolas em
            análises claras para produtores, técnicos e gestores tomarem
            decisões com mais segurança.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <RequestAccessButton className="h-12 px-6 text-base" />
            <Button variant="outline" className="h-12 px-6 text-base" asChild>
              <Link href="#demonstracao">Conhecer a plataforma</Link>
            </Button>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-muted-foreground">
            <span>Dados territoriais</span>
            <span aria-hidden="true">•</span>
            <span>Indicadores agrícolas</span>
            <span aria-hidden="true">•</span>
            <span>Decisões mais seguras</span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[690px] lg:mx-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-border bg-card shadow-lg">
            <Image
              src="/images/landing/hero-ceara.webp"
              alt="Plantação verde e açude no Ceará após a chuva"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#084C68]/55 via-transparent to-transparent" />
            <svg
              className="absolute inset-0 h-full w-full opacity-20"
              viewBox="0 0 700 520"
              aria-hidden="true"
            >
              <path
                d="M-20 390C120 330 180 450 330 370S560 260 740 330"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M-20 420C130 350 210 480 350 400S570 300 740 360"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M30 455C190 380 250 500 410 430S620 340 760 400"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="absolute -bottom-7 left-3 grid w-[calc(100%-1.5rem)] grid-cols-2 gap-2 rounded-2xl border border-white/25 bg-[#084C68]/95 p-3 text-white shadow-lg backdrop-blur-sm sm:left-6 sm:w-auto sm:grid-cols-4 sm:gap-4 sm:p-4">
            {[
              ["Amontada", "Município"],
              ["684 mm", "Chuva acumulada"],
              ["3,8 t/ha", "Produtividade"],
              ["+12,4%", "Variação da safra"],
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 sm:min-w-[105px]">
                <strong className="block truncate font-heading text-base sm:text-lg">
                  {value}
                </strong>
                <span className="block truncate text-[11px] text-white/70 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
