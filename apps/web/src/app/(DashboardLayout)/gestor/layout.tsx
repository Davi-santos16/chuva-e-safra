"use client";
import { RouteGuard } from "@/components/auth/route-guard";
import { GESTOR_ROLES } from "@/lib/auth/types";
export default function GestorLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard allowedRoles={GESTOR_ROLES}>{children}</RouteGuard>;
}
