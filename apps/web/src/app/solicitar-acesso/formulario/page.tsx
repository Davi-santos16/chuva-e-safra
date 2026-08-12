import { Suspense } from "react";
import { RequestWizard } from "@/app/components/access-request/RequestWizard";
export default function RequestFormPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground">
          Carregando formulário…
        </main>
      }
    >
      <RequestWizard />
    </Suspense>
  );
}
