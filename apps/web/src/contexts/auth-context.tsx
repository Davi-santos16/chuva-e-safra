"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login as requestLogin } from "@/services/auth";
import { getToken, getValidTokenPayload, removeToken, saveToken } from "@/lib/auth/token";
import { AuthUser, LoginCredentials, UserRole } from "@/lib/auth/types";

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<UserRole>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    removeToken();
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedToken = getToken();
    const payload = getValidTokenPayload(storedToken);
    if (storedToken && !payload) clearSession();
    if (payload && storedToken) {
      setToken(storedToken);
      setUser({ id: payload.sub, role: payload.role });
    }
    setIsLoading(false);
  }, [clearSession]);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    const { token: receivedToken } = await requestLogin(credentials);
    const payload = getValidTokenPayload(receivedToken);
    if (!payload) {
      removeToken();
      throw new Error("A sessão recebida é inválida ou expirou.");
    }
    saveToken(receivedToken);
    setToken(receivedToken);
    setUser({ id: payload.sub, role: payload.role });
    return payload.role;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login: signIn,
      logout: clearSession,
    }),
    [token, user, isLoading, signIn, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
