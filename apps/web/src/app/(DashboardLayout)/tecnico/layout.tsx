"use client";
import { RouteGuard } from "@/components/auth/route-guard";
import { TECNICO_ROLES } from "@/lib/auth/types";
export default function TecnicoLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard allowedRoles={TECNICO_ROLES}>{children}</RouteGuard>;
}
