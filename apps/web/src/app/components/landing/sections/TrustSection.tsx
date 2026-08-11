import { Icon } from '../LandingIcon'

export function TrustSection() {
  const items = [
    "Acesso organizado por perfil",
    "Visibilidade territorial controlada",
    "Avaliação documental prevista",
    "Rastreabilidade das informações",
    "Proteção dos dados do produtor",
  ];
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-border bg-card p-7 shadow-sm sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <Icon
                icon="solar:shield-check-linear"
                className="h-10 w-10 text-interactive"
                aria-hidden="true"
              />
              <h2 className="mt-5 text-2xl">Confiança desde a entrada</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A plataforma é concebida para organizar acesso e
                responsabilidade. Nesta versão, os fluxos são apenas
                demonstrativos e não representam mecanismos técnicos já
                implantados.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex min-h-14 items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground"
                >
                  <Icon
                    icon="tabler:lock-check"
                    width={20}
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
