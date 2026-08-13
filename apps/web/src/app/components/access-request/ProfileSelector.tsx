"use client";
import { BriefcaseBusiness, CheckCircle2, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileType, profileCopy } from "./types";
export function ProfileSelector({ value, onChange }: { value?: ProfileType; onChange: (v: ProfileType) => void }) {
  return <div className="grid gap-4 md:grid-cols-2" role="radiogroup" aria-label="Perfil de solicitação">
    {(["produtor", "tecnico"] as ProfileType[]).map((type) => { const Icon = type === "produtor" ? Sprout : BriefcaseBusiness; const selected = value === type; return <button key={type} type="button" role="radio" aria-checked={selected} onClick={() => onChange(type)} className={cn("relative min-h-56 rounded-2xl border-2 p-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selected ? "border-primary bg-secondary shadow-sm" : "border-border bg-card hover:border-primary/60 hover:bg-muted") }>
      <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Icon aria-hidden="true" /></span>
      <h2 className="text-xl">{profileCopy[type].label}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{profileCopy[type].description}</p><p className="mt-4 text-sm font-medium text-foreground">{profileCopy[type].examples}</p>
      {selected && <CheckCircle2 className="absolute right-5 top-5 text-success" aria-label="Perfil selecionado" />}
    </button> })}
  </div>;
}
