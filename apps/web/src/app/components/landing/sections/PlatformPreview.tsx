'use client'

/* eslint-disable @next/next/no-img-element -- Small local SVG inside the dashboard mockup. */

import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

const previews = {
  produtor: ["Produtor rural", "Amontada", "Milho", "3,8 t/ha"],
  tecnico: ["Técnico", "Itapipoca", "Feijão", "42 propriedades"],
  gestor: ["Gestor público", "Ceará", "Todas", "184 municípios"],
  admin: ["Administrador", "Plataforma", "Cadastros", "18 solicitações"],
} as const;

export function PlatformPreview() {
  const [profile, setProfile] = useState<keyof typeof previews>("produtor");
  const data = previews[profile];
  return (
    <section id="demonstracao" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Demonstração"
          title="Uma plataforma que muda de perspectiva sem perder clareza."
          description="Alterne entre os perfis para visualizar uma representação local e demonstrativa da experiência."
          align="center"
        />
        <div
          className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Perfis da demonstração"
        >
          {Object.entries(previews).map(([key, value]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={profile === key}
              onClick={() => setProfile(key as keyof typeof previews)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${profile === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary-hover"}`}
            >
              {value[0]}
            </button>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-[24px] border border-border bg-card shadow-lg">
          <div className="grid min-h-[560px] lg:grid-cols-[210px_1fr]">
            <aside className="hidden bg-[#084C68] p-5 text-white lg:block">
              <div className="flex items-center gap-3 border-b border-white/15 pb-5">
                <img
                  src="/logos/gota-monocromatica-branca.svg"
                  alt=""
                  className="h-9 w-9"
                />
                <span className="font-heading text-sm">Chuva &amp; Safra</span>
              </div>
              {[
                "Visão geral",
                "Chuvas",
                "Safras",
                "Território",
                "Indicadores",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`mt-3 rounded-lg px-3 py-2.5 text-sm ${index === 0 ? "bg-[#0B6E99] text-white" : "text-white/65"}`}
                >
                  {item}
                </div>
              ))}
            </aside>
            <div className="min-w-0 bg-background">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-4">
                <div>
                  <p className="font-heading text-sm">Olá, Daniel Verissimo</p>
                  <p className="text-xs text-muted-foreground">{data[0]}</p>
                </div>
                <div className="flex gap-2">
                  {[data[1], data[2], "2025/2026"].map((value) => (
                    <span
                      key={value}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-xs"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Chuva acumulada", "684 mm"],
                    ["Indicador principal", data[3]],
                    ["Risco climático", "Moderado"],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <span className="text-xs text-muted-foreground">
                        {label}
                      </span>
                      <strong
                        className={`mt-2 block font-heading text-xl ${index === 2 ? "text-warning-foreground" : ""}`}
                      >
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1.35fr_.65fr]">
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-base">Chuva e produtividade</h3>
                    <div className="mt-6 flex h-40 items-end gap-3">
                      {[35, 62, 48, 79, 55, 88, 70, 52].map((height, index) => (
                        <div
                          key={index}
                          className="flex h-full flex-1 items-end"
                        >
                          <span
                            className="w-full rounded-t bg-primary"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-base">Alertas do território</h3>
                    {[
                      "Regularidade de chuva",
                      "Janela de plantio",
                      "Atenção ao solo",
                    ].map((alert, index) => (
                      <div
                        key={alert}
                        className="mt-4 flex items-center gap-3 text-sm"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${index === 2 ? "bg-warning" : "bg-success"}`}
                        />
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
