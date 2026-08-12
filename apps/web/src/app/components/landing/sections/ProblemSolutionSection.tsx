import { Icon } from '../LandingIcon'
import { SectionHeading } from './SectionHeading'

export function ProblemSolutionSection() {
  const challenges = [
    [
      "solar:layers-minimalistic-linear",
      "Informações fragmentadas",
      "Dados climáticos, produtivos e territoriais em fontes diferentes.",
    ],
    [
      "solar:eye-closed-linear",
      "Pouca visibilidade",
      "Decisões importantes tomadas sem uma leitura integrada do cenário.",
    ],
    [
      "solar:map-arrow-square-linear",
      "Diferenças difíceis de acompanhar",
      "Comparar municípios e safras exige tempo e interpretação especializada.",
    ],
  ];
  return (
    <section id="sobre" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Do dado à decisão"
          title="O campo não precisa de mais informação dispersa. Precisa de clareza."
          description="O Chuva & Safra organiza sinais que antes chegavam separados e cria uma leitura comum para quem produz, orienta e planeja."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          {
            <div className="grid gap-4">
              {challenges.map(([icon, title, text]) => (
                <article
                  key={title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive-soft text-destructive">
                    <Icon icon={icon} width={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          }
          <div className="hidden items-center px-2 text-interactive lg:flex">
            <Icon
              icon="solar:arrow-right-linear"
              width={30}
              aria-hidden="true"
            />
          </div>
          <article className="relative overflow-hidden rounded-2xl bg-[#084C68] p-7 text-white shadow-lg sm:p-9">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[24px] border-white/5" />
            <Icon
              icon="solar:waterdrops-linear"
              className="h-10 w-10 text-[#75B84B]"
              aria-hidden="true"
            />
            <h3 className="mt-6 text-2xl text-white">
              Uma visão integrada do território
            </h3>
            <p className="mt-3 leading-relaxed text-white/75">
              Chuva, cultura, safra, produtividade e risco reunidos em
              indicadores visuais, comparações e históricos fáceis de
              interpretar.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-4">
                <strong className="font-heading text-xl text-[#F3E8D2]">
                  684 mm
                </strong>
                <span className="block text-xs text-white/65">
                  chuva acumulada
                </span>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <strong className="font-heading text-xl text-[#75B84B]">
                  +12,4%
                </strong>
                <span className="block text-xs text-white/65">
                  variação produtiva
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
