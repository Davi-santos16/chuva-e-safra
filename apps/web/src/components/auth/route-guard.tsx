"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { HOME_BY_ROLE, UserRole } from "@/lib/auth/types";

export function RouteGuard({ allowedRoles, children }: { allowedRoles: readonly UserRole[]; children: ReactNode }) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !role) {
      router.replace("/login");
      return;
    }
    if (!allowedRoles.includes(role) && pathname !== HOME_BY_ROLE[role])
      router.replace(HOME_BY_ROLE[role]);
  }, [allowedRoles, isAuthenticated, isLoading, pathname, role, router]);

  if (isLoading || !isAuthenticated || !role || !allowedRoles.includes(role)) {
    return (
      <main
        className="flex min-h-dvh items-center justify-center bg-background"
        aria-live="polite"
      >
        <LoaderCircle
          className="size-7 animate-spin text-interactive motion-reduce:animate-none"
          aria-label="Validando acesso"
        />
      </main>
    );
  }
  return <>{children}</>;
}
