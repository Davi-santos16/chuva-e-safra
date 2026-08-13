import Link from "next/link";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";

export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#062832] py-12 text-white">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <FullLogo surface="dark" className="w-[190px]" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              Dados climáticos e agrícolas apresentados com clareza para apoiar
              o desenvolvimento territorial e as decisões no campo cearense.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-white">
              Navegação
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link href="#como-funciona" className="hover:text-white">
                Como funciona
              </Link>
              <Link href="#recursos" className="hover:text-white">
                Recursos
              </Link>
              <Link href="#publicos" className="hover:text-white">
                Para quem é
              </Link>
              <Link href="/login" className="hover:text-white">
                Entrar
              </Link>
            </div>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-white">
              Informações
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <span>Política de privacidade — em elaboração</span>
              <span>Termos de uso — em elaboração</span>
              <span>Contato — a definir</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Chuva &amp; Safra.</p>
          <p>Projeto voltado ao apoio agrícola e territorial no Ceará.</p>
        </div>
      </div>
    </footer>
  );
}
