import { api } from "@/api/config";
import type { UserRole } from "@/lib/auth/types";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAT: string;
  updatedAT?: string | null;
}

export interface UsersSummary {
  total: number;
  administradores: number;
  produtores: number;
  tecnicos: number;
  gestores: number;
}

export interface AdminUsersData {
  resumo: UsersSummary;
  users: AdminUser[];
}

export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
}

export async function getAdminUsers() {
  const response = await api.get<AdminUsersData>("/admin/users");
  return response.data;
}

export async function createAdmin(input: CreateAdminInput) {
  const response = await api.post<{ message: string; user: AdminUser }>(
    "/admin/users",
    { ...input, role: "ADMIN" },
  );
  return response.data;
}

export interface AdminAccessRequest {
  id: string;
  protocol: string;
  name: string;
  email: string;
  role: "PRODUTOR" | "TECNICO_COOPERATIVA";
  municipioId?: number | null;
  regiaoImediataId?: number | null;
  municipio?: { nome: string } | null;
  documentName: string;
  documentMimeType: string;
  status: "PENDENTE" | "APROVADA" | "RECUSADA";
  rejectionReason?: string | null;
  createdAt: string;
  reviewedAt?: string | null;
}

export async function getAccessRequests() {
  const response = await api.get<{ requests: AdminAccessRequest[] }>(
    "/admin/access-requests",
  );
  return response.data.requests;
}

export async function getAccessRequestDocument(id: string) {
  const response = await api.get<Blob>(`/admin/access-requests/${id}/document`, {
    responseType: "blob",
  });
  return response.data;
}

export async function decideAccessRequest(
  id: string,
  decision: "APROVAR" | "RECUSAR",
  reason?: string,
) {
  const response = await api.patch(`/admin/access-requests/${id}/decision`, {
    decision,
    reason,
  });
  return response.data as { message: string };
}
