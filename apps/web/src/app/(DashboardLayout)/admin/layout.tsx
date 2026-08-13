"use client";
import { RouteGuard } from "@/components/auth/route-guard";
import { ADMIN_ROLES } from "@/lib/auth/types";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard allowedRoles={ADMIN_ROLES}>{children}</RouteGuard>;
}
