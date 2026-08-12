"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./LandingIcon";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import { Button } from "@/components/ui/button";
import { RequestAccessButton } from "./RequestAccessButton";

const links = [
  ["Início", "#inicio"],
  ["Como funciona", "#como-funciona"],
  ["Recursos", "#recursos"],
  ["Para quem é", "#publicos"],
  ["Sobre o projeto", "#sobre"],
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-md" : "bg-background/75 backdrop-blur-sm"}`}
    >
      <nav
        className="mx-auto flex min-h-[76px] max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Navegação pública"
      >
        <Link
          href="#inicio"
          className="inline-flex min-h-11 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FullLogo className="w-[164px] sm:w-[184px]" priority />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <RequestAccessButton />
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="landing-mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          <Icon
            icon={open ? "tabler:x" : "tabler:menu-2"}
            width={22}
            aria-hidden="true"
          />
        </button>
      </nav>

      {open ? (
        <div
          id="landing-mobile-menu"
          className="border-t border-border bg-background px-4 pb-5 pt-3 shadow-md lg:hidden"
        >
          <div className="mx-auto flex max-w-[1240px] flex-col gap-1">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <RequestAccessButton />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
