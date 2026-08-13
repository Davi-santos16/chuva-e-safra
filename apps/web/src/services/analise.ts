import { api } from "@/api/config";

export interface AnalysisFilters {
  cultura: string;
  de: number;
  ate: number;
  municipios?: string;
}

export interface AnalysisCulture {
  code: number;
  label: string;
  value: string;
}

export interface AnalysisKpis {
  total_municipios: number;
  total_culturas: number;
  periodos: number;
  produtividade_media: number | null;
  chuva_media: number | null;
  correlacao: number | null;
  observacoes: number;
}

export interface AnalysisChart {
  codigo: string;
  titulo: string;
  figura: {
    data: Record<string, unknown>[];
    layout?: Record<string, unknown>;
  };
}

export interface AnalysisData {
  perfil: "PRODUTOR" | "TECNICO" | "GESTOR";
  filtros: {
    cultura: string;
    produto_cod?: number;
    de: number;
    ate: number;
    municipios?: number[];
    uf?: string | null;
  };
  kpis: AnalysisKpis;
  insights: string[];
  graficos: AnalysisChart[];
}

interface AnalysisResponse {
  data: AnalysisData;
}

interface CulturesResponse {
  culturas: AnalysisCulture[];
}

export async function getAvailableCultures() {
  const response = await api.get<CulturesResponse>("/analises/culturas");
  return response.data.culturas;
}

export async function getAnalyses(filters: AnalysisFilters) {
  const response = await api.get<AnalysisResponse>("/analises", {
    params: filters,
  });

  return response.data.data;
}
