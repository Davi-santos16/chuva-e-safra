"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCurrentUser, login as requestLogin } from "@/services/auth";
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
    let active = true;

    async function restoreSession() {
      const storedToken = getToken();
      const payload = getValidTokenPayload(storedToken);

      if (!storedToken || !payload) {
        if (storedToken) clearSession();
        if (active) setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        if (!active) return;
        setToken(storedToken);
        setUser(currentUser);
      } catch {
        if (active) clearSession();
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, [clearSession]);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    const { token: receivedToken } = await requestLogin(credentials);
    const payload = getValidTokenPayload(receivedToken);
    if (!payload) {
      removeToken();
      throw new Error("A sessão recebida é inválida ou expirou.");
    }
    saveToken(receivedToken);

    try {
      const currentUser = await getCurrentUser();
      setToken(receivedToken);
      setUser(currentUser);
      return currentUser.role;
    } catch (error) {
      removeToken();
      throw error;
    }
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
