export const USER_ROLES = [
  "PRODUTOR",
  "TECNICO_COOPERATIVA",
  "GESTOR_PUBLICO",
  "ADMIN",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface TokenPayload {
  sub: string;
  role: UserRole;
  exp: number;
  iat?: number;
}

export interface AuthUser {
  id: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const HOME_BY_ROLE: Record<UserRole, string> = {
  PRODUTOR: "/produtor/dashboard",
  TECNICO_COOPERATIVA: "/tecnico/dashboard",
  GESTOR_PUBLICO: "/gestor/dashboard",
  ADMIN: "/admin/dashboard",
};

export const ALL_AUTHENTICATED_ROLES: readonly UserRole[] = USER_ROLES;
export const PRODUTOR_ROLES: readonly UserRole[] = ["PRODUTOR"];
export const TECNICO_ROLES: readonly UserRole[] = ["TECNICO_COOPERATIVA"];
export const GESTOR_ROLES: readonly UserRole[] = ["GESTOR_PUBLICO"];
export const ADMIN_ROLES: readonly UserRole[] = ["ADMIN"];
