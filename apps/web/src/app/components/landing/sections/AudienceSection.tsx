import { Icon } from '../LandingIcon'

export function AudienceSection() {
  const profiles = [
    [
      "solar:user-heart-rounded-linear",
      "Produtor rural",
      "Acompanha culturas, safras, produtividade, chuva e riscos da sua atuação.",
    ],
    [
      "solar:users-group-two-rounded-linear",
      "Técnico de cooperativa",
      "Analisa produtores, propriedades e indicadores para assistência técnica.",
    ],
    [
      "solar:buildings-2-linear",
      "Gestor público",
      "Visualiza tendências e comparações para apoiar políticas públicas.",
    ],
    [
      "solar:settings-minimalistic-linear",
      "Administrador",
      "Gerencia usuários, organizações, documentos e solicitações.",
    ],
  ];
  return (
    <section id="publicos" className="bg-[#084C68] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#75B84B]">
            Para quem é
          </p>
          <h2 className="text-[clamp(1.9rem,4vw,3rem)] text-white">
            Quatro perspectivas. Um mesmo território.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Cada perfil encontra uma leitura coerente com suas decisões e
            responsabilidades.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {profiles.map(([icon, title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-white/15 bg-white/[0.07] p-6"
            >
              <Icon
                icon={icon}
                className="h-8 w-8 text-[#75B84B]"
                aria-hidden="true"
              />
              <h3 className="mt-7 text-xl text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-[#75B84B]/30 bg-[#75B84B]/10 p-4 text-sm text-white/80">
          O produtor pode solicitar acesso publicamente. A proposta prevê
          análise responsável por um administrador antes da liberação.
        </p>
      </div>
    </section>
  );
}
