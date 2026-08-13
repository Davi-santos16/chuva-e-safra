"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";

import CardBox from "@/app/components/shared/CardBox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserRole } from "@/lib/auth/types";
import {
  AdminUsersData,
  CreateAdminInput,
  createAdmin,
  getAdminUsers,
} from "@/services/admin";
import { AccessRequestsPanel } from "./AccessRequestsPanel";

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Administrador",
  PRODUTOR: "Produtor",
  TECNICO_COOPERATIVA: "Técnico",
  GESTOR_PUBLICO: "Gestor público",
};

const ROLE_BADGES: Record<UserRole, "primary" | "success" | "info" | "warning"> = {
  ADMIN: "primary",
  PRODUTOR: "success",
  TECNICO_COOPERATIVA: "info",
  GESTOR_PUBLICO: "warning",
};

const EMPTY_FORM: CreateAdminInput = { name: "", email: "", password: "" };

function errorMessage(error: unknown, fallback: string) {
  if (isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(" ");
    if (message) return message;
  }
  return fallback;
}

export function AdminDashboard() {
  const [data, setData] = useState<AdminUsersData | null>(null);
  const [form, setForm] = useState<CreateAdminInput>(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      setData(await getAdminUsers());
    } catch (error) {
      setLoadError(errorMessage(error, "Não foi possível carregar os usuários."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function handleCreateAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);

    if (form.name.trim().length < 3) {
      setFormError("Informe um nome com pelo menos 3 caracteres.");
      return;
    }
    if (form.password.length < 8) {
      setFormError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsCreating(true);
    try {
      const result = await createAdmin(form);
      setSuccess(result.message);
      setForm(EMPTY_FORM);
      await loadUsers();
    } catch (error) {
      setFormError(errorMessage(error, "Não foi possível criar o administrador."));
    } finally {
      setIsCreating(false);
    }
  }

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    if (!term) return data?.users ?? [];
    return (data?.users ?? []).filter((user) =>
      `${user.name} ${user.email} ${ROLE_LABELS[user.role]}`
        .toLocaleLowerCase("pt-BR")
        .includes(term),
    );
  }, [data?.users, search]);

  const summaryCards = [
    { label: "Total de usuários", value: data?.resumo.total, icon: "solar:users-group-rounded-linear" },
    { label: "Produtores", value: data?.resumo.produtores, icon: "solar:leaf-linear" },
    { label: "Técnicos", value: data?.resumo.tecnicos, icon: "solar:case-round-linear" },
    { label: "Gestores", value: data?.resumo.gestores, icon: "solar:buildings-2-linear" },
    { label: "Administradores", value: data?.resumo.administradores, icon: "solar:shield-user-linear" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary">
            Administração da plataforma
          </p>
          <h1>Controle de acessos</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Acompanhe as contas da plataforma e provisione administradores autorizados.
          </p>
        </div>
        <div className="flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
          <Icon icon="solar:shield-check-linear" className="text-lg text-primary" aria-hidden="true" />
          Área restrita
        </div>
      </div>

      {loadError && (
        <Alert variant="destructive">
          <Icon icon="solar:danger-triangle-linear" aria-hidden="true" />
          <AlertTitle>Erro ao carregar usuários</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center gap-3">
            <span>{loadError}</span>
            <Button variant="outlineerror" size="sm" onClick={() => void loadUsers()}>
              Tentar novamente
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => (
          <CardBox key={card.label} className="overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {isLoading ? "—" : (card.value ?? 0).toLocaleString("pt-BR")}
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon icon={card.icon} className="text-xl" aria-hidden="true" />
              </span>
            </div>
          </CardBox>
        ))}
      </div>

      <AccessRequestsPanel />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <CardBox className="min-w-0 p-0!">
          <div className="flex flex-col gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-semibold">Usuários cadastrados</h2>
              <p className="text-sm text-muted-foreground">Contas e perfis com acesso à plataforma</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Icon
                icon="solar:magnifer-linear"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar nome, e-mail ou perfil"
                className="pl-10"
                aria-label="Buscar usuários"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Criado em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={3}>
                      <div className="h-8 animate-pulse rounded bg-muted" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-semibold text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={ROLE_BADGES[user.role]}>{ROLE_LABELS[user.role]}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
                        new Date(user.createdAT),
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="py-10 text-center text-muted-foreground">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBox>

        <CardBox>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon icon="solar:user-plus-linear" className="text-xl" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Novo administrador</h2>
              <p className="text-sm text-muted-foreground">Crie outro acesso administrativo</p>
            </div>
          </div>

          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="lightsuccess" className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Nome completo</Label>
              <Input
                id="admin-name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">E-mail</Label>
              <Input
                id="admin-email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Senha provisória</Label>
              <Input
                id="admin-password"
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                minLength={8}
                autoComplete="new-password"
                required
              />
              <p className="text-xs text-muted-foreground">Use pelo menos 8 caracteres.</p>
            </div>
            <Button type="submit" className="w-full" disabled={isCreating} aria-busy={isCreating}>
              <Icon
                icon={isCreating ? "solar:refresh-linear" : "solar:shield-plus-linear"}
                className={isCreating ? "animate-spin" : ""}
                aria-hidden="true"
              />
              {isCreating ? "Criando..." : "Criar administrador"}
            </Button>
          </form>
        </CardBox>
      </div>
    </div>
  );
}
