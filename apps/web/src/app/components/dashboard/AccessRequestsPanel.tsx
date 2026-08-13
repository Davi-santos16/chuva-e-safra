"use client";

import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Icon } from "@iconify/react";

import CardBox from "@/app/components/shared/CardBox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AdminAccessRequest,
  decideAccessRequest,
  getAccessRequestDocument,
  getAccessRequests,
} from "@/services/admin";

function getErrorMessage(error: unknown) {
  if (isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message;
    return Array.isArray(message) ? message.join(" ") : message;
  }
  return undefined;
}

export function AccessRequestsPanel() {
  const [requests, setRequests] = useState<AdminAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string>();
  const [rejectionId, setRejectionId] = useState<string>();
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string }>();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRequests(await getAccessRequests());
    } catch (error) {
      setMessage({ kind: "error", text: getErrorMessage(error) || "Não foi possível carregar as solicitações." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function viewDocument(request: AdminAccessRequest) {
    try {
      const blob = await getAccessRequestDocument(request.id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      setMessage({ kind: "error", text: getErrorMessage(error) || "Não foi possível abrir o documento." });
    }
  }

  async function decide(id: string, decision: "APROVAR" | "RECUSAR") {
    if (decision === "RECUSAR" && !reason.trim()) {
      setMessage({ kind: "error", text: "Informe o motivo da recusa." });
      return;
    }
    setProcessing(id);
    setMessage(undefined);
    try {
      const result = await decideAccessRequest(id, decision, decision === "RECUSAR" ? reason : undefined);
      setMessage({ kind: "success", text: result.message });
      setRejectionId(undefined);
      setReason("");
      await load();
    } catch (error) {
      setMessage({ kind: "error", text: getErrorMessage(error) || "Não foi possível registrar a decisão." });
    } finally {
      setProcessing(undefined);
    }
  }

  const pending = requests.filter((request) => request.status === "PENDENTE");

  return (
    <CardBox className="p-0!">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold">Solicitações de acesso</h2>
          <p className="text-sm text-muted-foreground">Analise o documento antes de liberar produtor ou técnico</p>
        </div>
        <Badge variant={pending.length ? "warning" : "success"}>{pending.length} pendente(s)</Badge>
      </div>

      {message && (
        <div className="px-5 pt-5 sm:px-6">
          <Alert variant={message.kind === "error" ? "destructive" : "lightsuccess"}><AlertDescription>{message.text}</AlertDescription></Alert>
        </div>
      )}

      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-6"><div className="h-20 animate-pulse rounded bg-muted" /></div>
        ) : pending.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Não há solicitações aguardando análise.</div>
        ) : pending.map((request) => (
          <article key={request.id} className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{request.name}</h3>
                  <Badge variant={request.role === "PRODUTOR" ? "success" : "info"}>{request.role === "PRODUTOR" ? "Produtor" : "Técnico"}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{request.email} · {request.protocol}</p>
                <p className="mt-2 text-sm"><strong>Área:</strong> {request.role === "PRODUTOR" ? request.municipio?.nome : `Região imediata ${request.regiaoImediataId}`}</p>
                <p className="mt-1 text-xs text-muted-foreground">Enviada em {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(request.createdAt))}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => void viewDocument(request)}><Icon icon="solar:document-linear" />Ver documento</Button>
                <Button size="sm" disabled={processing === request.id} onClick={() => void decide(request.id, "APROVAR")}><Icon icon="solar:check-circle-linear" />Aprovar</Button>
                <Button variant="outlineerror" size="sm" disabled={processing === request.id} onClick={() => setRejectionId(rejectionId === request.id ? undefined : request.id)}><Icon icon="solar:close-circle-linear" />Recusar</Button>
              </div>
            </div>
            {rejectionId === request.id && (
              <div className="mt-4 flex flex-col gap-2 rounded-lg bg-destructive-soft p-4 sm:flex-row">
                <Input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Motivo da recusa" maxLength={500} />
                <Button variant="destructive" disabled={processing === request.id} onClick={() => void decide(request.id, "RECUSAR")}>Confirmar recusa</Button>
              </div>
            )}
          </article>
        ))}
      </div>
    </CardBox>
  );
}
