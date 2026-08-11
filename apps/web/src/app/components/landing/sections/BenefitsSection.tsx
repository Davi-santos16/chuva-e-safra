import { Icon } from '../LandingIcon'
import { SectionHeading } from './SectionHeading'

export function BenefitsSection() {
  const benefits = [
    "Compreender o comportamento das chuvas",
    "Identificar mudanças na produtividade",
    "Comparar safras e municípios",
    "Antecipar situações de risco",
    "Aproximar campo, cooperativas e gestão pública",
    "Decidir com dados organizados",
  ];
  return (
    <section className="bg-secondary/55 py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Benefícios"
            title="Tecnologia que ajuda a enxergar melhor o que acontece no campo."
            description="A proposta é tornar informações complexas mais próximas das pessoas que convivem com o território todos os dias."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-border bg-card p-4"
              >
                <Icon
                  icon="solar:check-circle-linear"
                  className="mt-0.5 h-5 w-5 shrink-0 text-success"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
