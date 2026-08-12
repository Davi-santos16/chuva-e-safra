import { RequestAccessButton } from '../RequestAccessButton'
import { SectionHeading } from './SectionHeading'

export function ProducerAccessFlow() {
  const steps = [
    "Preenche seus dados",
    "Envia identificação",
    "Comprova atividade rural",
    "Administrador analisa",
    "Recebe o resultado",
    "Acessa a plataforma",
  ];
  return (
    <section className="bg-accent py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Acesso do produtor"
              title="Você produz no Ceará? Solicite seu acesso."
              description="Um fluxo demonstrativo pensado para reconhecer o vínculo com o território e organizar a entrada na plataforma."
            />
            <RequestAccessButton className="mt-7 h-12 px-6">
              Começar solicitação
            </RequestAccessButton>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Exemplos de comprovantes: CAF ou DAP, CAR, declaração de
              associação ou cooperativa, documento de posse ou contrato de
              arrendamento.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm text-primary-foreground">
                  {index + 1}
                </span>
                <span className="font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
