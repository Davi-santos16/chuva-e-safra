import type { Metadata } from "next";
import { LandingHeader } from "./components/landing/LandingHeader";
import { HeroSection } from "./components/landing/HeroSection";
import {
  ProblemSolutionSection,
  HowItWorks,
  FeaturesGrid,
  AudienceSection,
  ProducerAccessFlow,
  PlatformPreview,
  BenefitsSection,
  TrustSection,
  FinalCTA,
} from "./components/landing/sections";
import { LandingFooter } from "./components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Chuva & Safra | Inteligência agrícola para o Ceará",
  description:
    "Dados climáticos e agrícolas transformados em análises claras para apoiar decisões no campo cearense.",
};

export default function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorks />
        <FeaturesGrid />
        <AudienceSection />
        <ProducerAccessFlow />
        <PlatformPreview />
        <BenefitsSection />
        <TrustSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
