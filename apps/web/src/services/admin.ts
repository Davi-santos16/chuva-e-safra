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
