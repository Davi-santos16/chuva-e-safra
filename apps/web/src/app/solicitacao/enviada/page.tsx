"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Download, ShieldCheck } from "lucide-react";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { AccessShell } from "@/app/components/access-request/AccessShell";
import {
  profileCopy,
  ProfileType,
} from "@/app/components/access-request/types";
function SentContent() {
  const p = useSearchParams(),
    [copied, setCopied] = useState(false),
    protocol = p.get("protocolo") || "Protocolo indisponível",
    profile = (
      p.get("perfil") === "tecnico" ? "tecnico" : "produtor"
    ) as ProfileType,
    name = p.get("nome") || "Solicitante";
  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(
        [`Comprovante demonstrativo\nProtocolo: ${protocol}\nStatus: Pendente`],
        { type: "text/plain" },
      ),
    );
    a.download = `${protocol}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <AccessShell>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
          <CheckCircle2
            className="mx-auto size-16 text-success"
            aria-hidden="true"
          />
          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-success">
            Status: Pendente
          </p>
          <h1 className="mt-2 text-3xl">Solicitação enviada para análise</h1>
          <p className="mt-3 text-muted-foreground">
            {name}, recebemos sua solicitação como{" "}
            {profileCopy[profile].label.toLowerCase()}.
          </p>
          <div className="mx-auto mt-7 max-w-md rounded-xl bg-muted p-5">
            <p className="text-sm text-muted-foreground">
              Guarde seu protocolo
            </p>
            <p className="mt-1 font-heading text-2xl text-interactive">
              {protocol}
            </p>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(protocol);
                setCopied(true);
              }}
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-interactive hover:bg-secondary"
            >
              <Copy size={16} />
              {copied ? "Copiado" : "Copiar protocolo"}
            </button>
          </div>
          <div className="mt-8 text-left">
            <h2 className="text-xl">Próximos passos</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              {[
                "Conferência dos dados",
                "Análise dos documentos",
                "Aprovação, correção ou recusa",
                "Liberação do acesso em caso de aprovação",
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="font-heading text-success">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-7 flex gap-2 rounded-lg border border-border p-4 text-left text-sm text-muted-foreground">
            <ShieldCheck className="size-5 shrink-0 text-interactive" />
            Use o protocolo e o e-mail informado para acompanhar a análise.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" onClick={download}>
              <Download />
              Baixar comprovante
            </Button>
            <Button asChild>
              <Link href="/acompanhar-solicitacao">Acompanhar solicitação</Link>
            </Button>
          </div>
          <Link
            href="/"
            className="mt-5 inline-block text-sm font-semibold text-interactive underline-offset-4 hover:underline"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    </AccessShell>
  );
}

export default function SentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground">
          Carregando solicitação…
        </main>
      }
    >
      <SentContent />
    </Suspense>
  );
}
