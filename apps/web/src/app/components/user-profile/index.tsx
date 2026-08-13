"use client";

import Image from "next/image";

import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import { useAuth } from "@/hooks/use-auth";
import { HOME_BY_ROLE, type UserRole } from "@/lib/auth/types";

const ROLE_LABELS: Record<UserRole, string> = {
  PRODUTOR: "Produtor",
  TECNICO_COOPERATIVA: "Técnico de cooperativa",
  GESTOR_PUBLICO: "Gestor público",
  ADMIN: "Administrador",
};

function formatDate(value: string | null) {
  if (!value) return "Não informado";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm text-foreground">{value}</dd>
    </div>
  );
}

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const territorialFields = {
    PRODUTOR: [
      { label: "Município (código IBGE)", value: user.municipio ?? "Não informado" },
    ],
    TECNICO_COOPERATIVA: [
      {
        label: "Região imediata",
        value: user.regiaoImediataId?.toString() ?? "Não informada",
      },
    ],
    GESTOR_PUBLICO: [{ label: "UF", value: user.uf ?? "Não informada" }],
    ADMIN: [{ label: "Escopo", value: "Administração da plataforma" }],
  }[user.role];

  return (
    <>
      <BreadcrumbComp
        title="Meu perfil"
        items={[
          { to: HOME_BY_ROLE[user.role], title: "Dashboard" },
          { title: "Meu perfil" },
        ]}
      />

      <div className="flex flex-col gap-6">
        <CardBox className="overflow-hidden p-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Image
              src="/images/profile/user-1.jpg"
              alt={`Foto de perfil de ${user.name}`}
              width={88}
              height={88}
              className="rounded-full object-cover"
              priority
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-foreground">{user.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              <span className="mt-3 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-interactive">
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>
        </CardBox>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-foreground">Dados da conta</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <ProfileField label="Nome" value={user.name} />
              <ProfileField label="E-mail" value={user.email} />
              <ProfileField label="Perfil" value={ROLE_LABELS[user.role]} />
              <ProfileField label="Identificador" value={user.id} />
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-foreground">Vínculo e atividade</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              {territorialFields.map((field) => (
                <ProfileField key={field.label} label={field.label} value={field.value} />
              ))}
              <ProfileField label="Conta criada em" value={formatDate(user.createdAT)} />
              <ProfileField label="Última atualização" value={formatDate(user.updatedAT)} />
            </dl>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
