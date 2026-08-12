import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RequestAccessButton({
  children = "Solicitar acesso",
  className,
  variant = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) {
  return (
      <Button variant={variant} className={className} asChild>
        <Link href="/solicitar-acesso">
        {children}
        </Link>
      </Button>
  );
}
