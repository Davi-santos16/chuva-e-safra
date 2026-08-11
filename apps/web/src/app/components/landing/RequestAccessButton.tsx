"use client";

import { useState } from "react";
import { Icon } from "./LandingIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RequestAccessButton({
  children = "Solicitar acesso",
  className,
  variant = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) {
  const [visible, setVisible] = useState(false);

  const showFeedback = () => {
    setVisible(true);
    window.setTimeout(() => setVisible(false), 4200);
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={showFeedback}
      >
        {children}
      </Button>
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-5 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-lg transition-all duration-300 motion-reduce:transition-none",
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <Icon
          icon="solar:info-circle-linear"
          className="mt-0.5 h-5 w-5 shrink-0 text-interactive"
          aria-hidden="true"
        />
        <div>
          <p className="font-semibold">Solicitação em breve</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Este fluxo é demonstrativo e será disponibilizado em uma próxima
            etapa.
          </p>
        </div>
      </div>
    </>
  );
}
