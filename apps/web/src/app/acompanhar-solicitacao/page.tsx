"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { isAxiosError } from "axios";
import { CheckCircle2, Clock3, Search, XCircle } from "lucide-react";

import { AccessShell } from "@/app/components/access-request/AccessShell";
import { Button } from "@/components/ui/button";
import { getAccessRequestStatus, AccessRequestStatusData } from "@/services/access-request";

const statusCopy = {
  PENDENTE: { label: "Pendente", className: "bg-warning-soft text-foreground", icon: Clock3 },
  APROVADA: { label: "Aprovada", className: "bg-success-soft text-success", icon: CheckCircle2 },
  RECUSADA: { label: "Recusada", className: "bg-destructive-soft text-destructive", icon: XCircle },
} as const;

export default function TrackingPage() {
  const [email, setEmail] = useState("");
  const [protocol, setProtocol] = useState("");
  const [result, setResult] = useState<AccessRequestStatusData>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function search(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    setResult(undefined);
    try {
      setResult(await getAccessRequestStatus(protocol.trim(), email.trim().toLowerCase()));
    } catch (requestError) {
      const message = isAxiosError<{ message?: string | string[] }>(requestError) ? requestError.response?.data?.message : undefined;
      setError(Array.isArray(message) ? message.join(" ") : message || "Não foi possível consultar a solicitação.");
    } finally {
      setLoading(false);
    }
  }

  const status = result ? statusCopy[result.status] : undefined;
  const StatusIcon = status?.icon;

  return (
    <AccessShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-success">Acompanhamento</p>
          <h1 className="mt-2 text-3xl">Consulte sua solicitação</h1>
          <p className="mt-3 text-muted-foreground">Informe o e-mail usado no cadastro e o protocolo recebido após o envio.</p>
        </header>
        <div className="mt-8 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <form onSubmit={search} className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm">
            <label className="block text-sm font-semibold">E-mail<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 font-normal" /></label>
            <label className="mt-4 block text-sm font-semibold">Protocolo<input required value={protocol} onChange={(event) => setProtocol(event.target.value.toUpperCase())} placeholder="CSA-2026-XXXXXXXX" className="mt-2 h-11 w-full rounded-md border border-input bg-card px-3 font-normal" /></label>
            {error && <p role="alert" className="mt-4 rounded-lg bg-destructive-soft p-3 text-sm text-destructive">{error}</p>}
            <Button className="mt-6 w-full" type="submit" disabled={loading}><Search />{loading ? "Consultando..." : "Consultar solicitação"}</Button>
          </form>

          {result && status && StatusIcon ? (
            <article aria-live="polite" className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><p className="text-sm text-muted-foreground">Protocolo</p><h2 className="mt-1 text-2xl">{result.protocol}</h2><p className="mt-2 text-sm text-muted-foreground">{result.name} · {result.role === "PRODUTOR" ? "Produtor rural" : "Técnico"}</p></div>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}><StatusIcon size={16} />{status.label}</span>
              </div>
              <div className="mt-7 rounded-xl bg-muted p-5 text-sm">
                {result.status === "PENDENTE" && <p>Sua solicitação e o documento aguardam análise do administrador. O acesso ainda não está liberado.</p>}
                {result.status === "APROVADA" && <p>Sua solicitação foi aprovada e a conta está liberada. Entre usando o e-mail e a senha cadastrados.</p>}
                {result.status === "RECUSADA" && <><p><strong>Motivo da recusa:</strong> {result.rejectionReason}</p><p className="mt-2">Entre em contato com a administração caso precise corrigir ou reenviar os dados.</p></>}
              </div>
              {result.status === "APROVADA" && <Button className="mt-6" asChild><Link href="/login">Entrar no sistema</Link></Button>}
            </article>
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground"><Clock3 className="mr-3 size-6" />Faça uma consulta para ver o andamento.</div>
          )}
        </div>
      </section>
    </AccessShell>
  );
}
