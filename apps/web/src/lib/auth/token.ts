import { jwtDecode } from "jwt-decode";
import { TokenPayload, USER_ROLES, UserRole } from "./types";

export const AUTH_TOKEN_KEY = "authToken";

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && USER_ROLES.includes(value as UserRole);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveToken(token: string): void {
  if (typeof window !== "undefined") window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = jwtDecode<Partial<TokenPayload>>(token);
    if (!payload.sub || !isUserRole(payload.role) || typeof payload.exp !== "number") return null;
    return { sub: payload.sub, role: payload.role, exp: payload.exp, iat: payload.iat };
  } catch {
    return null;
  }
}

export function isTokenExpired(payload: TokenPayload): boolean {
  return payload.exp * 1000 <= Date.now();
}

export function getValidTokenPayload(token: string | null): TokenPayload | null {
  if (!token) return null;
  const payload = decodeToken(token);
  return payload && !isTokenExpired(payload) ? payload : null;
}
