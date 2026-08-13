"use client";
import { RouteGuard } from "@/components/auth/route-guard";
import { PRODUTOR_ROLES } from "@/lib/auth/types";
export default function ProdutorLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard allowedRoles={PRODUTOR_ROLES}>{children}</RouteGuard>;
}
