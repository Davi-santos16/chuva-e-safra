"use client";

import dynamic from "next/dynamic";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";
import { useTheme } from "next-themes";
import type { Config, Data, Layout } from "plotly.js";

import CardBox from "@/app/components/shared/CardBox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AnalysisChart,
  AnalysisData,
  getAnalyses,
} from "@/services/analise";
import {
  Municipality,
  getTechnicianMunicipalities,
} from "@/services/municipio";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const YEARS = Array.from({ length: 12 }, (_, index) => 2010 + index);

const CULTURES = [
  { code: 2711, label: "Milho (em grão)", value: "MILHO" },
  { code: 2702, label: "Feijão (em grão)", value: "FEIJÃO" },
  { code: 2692, label: "Arroz (em casca)", value: "ARROZ" },
  { code: 2708, label: "Mandioca", value: "MANDIOCA" },
  { code: 2713, label: "Soja (em grão)", value: "SOJA" },
  { code: 2720, label: "Banana (cacho)", value: "BANANA" },
  { code: 40473, label: "Caju", value: "CAJU" },
  { code: 2727, label: "Coco-da-baía", value: "COCO-DA-BAÍA" },
  { code: 2737, label: "Manga", value: "MANGA" },
  { code: 2715, label: "Tomate", value: "TOMATE" },
] as const;

interface MunicipalityMultiSelectProps {
  municipalities: Municipality[];
  selectedIds: number[];
  disabled?: boolean;
  onChange: (ids: number[]) => void;
}

function MunicipalityMultiSelect({
  municipalities,
  selectedIds,
  disabled,
  onChange,
}: MunicipalityMultiSelectProps) {
  const selected = new Set(selectedIds);
  const allSelected = municipalities.length > 0 && selectedIds.length === municipalities.length;

  function toggleMunicipality(id: number) {
    onChange(
      selected.has(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id],
    );
  }

  const summary =
    selectedIds.length === 0
      ? "Selecione um ou mais municípios"
      : selectedIds.length === 1
        ? municipalities.find((municipality) => municipality.id === selectedIds[0])?.nome
        : `${selectedIds.length} municípios selecionados`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outlinesecondary"
          className="w-full justify-between px-3 font-normal"
          disabled={disabled}
          aria-label="Selecionar municípios"
        >
          <span className="truncate">{summary}</span>
          <Icon icon="solar:alt-arrow-down-linear" className="shrink-0" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-72 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Municípios da sua região</p>
            <p className="text-xs text-muted-foreground">{selectedIds.length} selecionado(s)</p>
          </div>
          <Button
            type="button"
            variant="ghostprimary"
            size="sm"
            onClick={() => onChange(allSelected ? [] : municipalities.map(({ id }) => id))}
          >
            {allSelected ? "Limpar" : "Todos"}
          </Button>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {municipalities.map((municipality) => (
            <label
              key={municipality.id}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary"
            >
              <Checkbox
                id={`municipality-${municipality.id}`}
                checked={selected.has(municipality.id)}
                onCheckedChange={() => toggleMunicipality(municipality.id)}
              />
              <span className="min-w-0 flex-1 truncate">{municipality.nome}</span>
              <span className="text-xs tabular-nums text-muted-foreground">{municipality.id}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AnalysisChartCard({ chart }: { chart: AnalysisChart }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const apiLayout = chart.figura.layout as Partial<Layout>;
  const layout: Partial<Layout> = {
    ...apiLayout,
    title: undefined,
    autosize: true,
    height: 360,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: {
      ...apiLayout.font,
      family: "var(--font-inter), sans-serif",
      color: isDark ? "#B8CCCA" : "#153B46",
    },
  };
  const config: Partial<Config> = {
    responsive: true,
    displaylogo: false,
    scrollZoom: false,
  };

  return (
    <CardBox className="min-w-0 overflow-hidden p-0!">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold sm:text-lg">{chart.titulo}</h2>
      </div>
      <div
        className="min-w-0 p-2 sm:p-4"
        role="img"
        aria-label={`Gráfico ${chart.titulo}`}
      >
        <Plot
          data={chart.figura.data as Data[]}
          layout={layout}
          config={config}
          useResizeHandler
          style={{ width: "100%", height: "360px" }}
        />
      </div>
    </CardBox>
  );
}

function formatDecimal(value: number | null, suffix = "") {
  if (value === null || !Number.isFinite(value)) return "Sem dados";
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}${suffix}`;
}

function getErrorMessage(
  error: unknown,
  fallback = "Não foi possível carregar as análises. Tente novamente.",
) {
  if (isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(" ");
    if (message) return message;
  }
  return fallback;
}

type AnalysisAudience = "producer" | "technician" | "manager";

const AUDIENCE_CONTENT = {
  producer: {
    eyebrow: "Painel do produtor",
    title: "Análises agrícolas",
    description: "Compare chuva e produtividade no município vinculado ao seu cadastro.",
    scopeLabel: "Seu município",
    scopeDescription: "O município vem do seu cadastro.",
    scopeIcon: "solar:map-point-linear",
    insightsTitle: "Leituras importantes",
    insightsDescription: "Como interpretar o recorte selecionado",
  },
  technician: {
    eyebrow: "Painel técnico regional",
    title: "Análises da região imediata",
    description:
      "Compare municípios da sua área de atuação e identifique diferenças de chuva e produtividade.",
    scopeLabel: "Sua região imediata",
    scopeDescription: "Os municípios disponíveis pertencem à sua região cadastrada.",
    scopeIcon: "solar:map-point-wave-linear",
    insightsTitle: "Orientações para o acompanhamento",
    insightsDescription: "Evidências para priorizar municípios e apoiar os produtores",
  },
  manager: {
    eyebrow: "Gestão pública estadual",
    title: "Panorama agrícola do Ceará",
    description:
      "Acompanhe produtividade, chuva e diferenças entre municípios para apoiar decisões em todo o estado.",
    scopeLabel: "Ceará",
    scopeDescription: "Abrangência estadual: todos os municípios do Ceará.",
    scopeIcon: "solar:map-linear",
    insightsTitle: "Subsídios para decisão",
    insightsDescription: "Evidências e cuidados para interpretar o cenário estadual",
  },
} as const;

function AgriculturalAnalyses({ audience }: { audience: AnalysisAudience }) {
  const [culture, setCulture] = useState("MILHO");
  const [fromYear, setFromYear] = useState(2010);
  const [toYear, setToYear] = useState(2021);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [selectedMunicipalityIds, setSelectedMunicipalityIds] = useState<number[]>([]);
  const [isLoadingMunicipalities, setIsLoadingMunicipalities] = useState(
    audience === "technician",
  );

  const loadAnalysis = useCallback(
    async (cultura: string, de: number, ate: number, municipalityIds: number[] = []) => {
      if (audience === "technician" && municipalityIds.length === 0) {
        setError("Selecione pelo menos um município da sua região.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await getAnalyses({
          cultura,
          de,
          ate,
          ...(audience === "technician"
            ? { municipios: municipalityIds.join(",") }
            : {}),
        });
        setAnalysis(data);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    },
    [audience],
  );

  const loadMunicipalities = useCallback(async () => {
    setIsLoadingMunicipalities(true);
    setError(null);
    try {
      const allowedMunicipalities = await getTechnicianMunicipalities();
      const municipalityIds = allowedMunicipalities.map(({ id }) => id);
      setMunicipalities(allowedMunicipalities);
      setSelectedMunicipalityIds(municipalityIds);

      if (municipalityIds.length === 0) {
        setError("Nenhum município foi encontrado na sua região imediata.");
        setIsLoading(false);
        return;
      }

      await loadAnalysis("MILHO", 2010, 2021, municipalityIds);
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Não foi possível carregar os municípios da sua região. Tente novamente.",
        ),
      );
      setIsLoading(false);
    } finally {
      setIsLoadingMunicipalities(false);
    }
  }, [loadAnalysis]);

  useEffect(() => {
    if (audience === "technician") {
      void loadMunicipalities();
      return;
    }

    void loadAnalysis("MILHO", 2010, 2021);
  }, [audience, loadAnalysis, loadMunicipalities]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadAnalysis(culture, fromYear, toYear, selectedMunicipalityIds);
  }

  const content = AUDIENCE_CONTENT[audience];
  const kpis = analysis?.kpis;
  const commonKpis = [
    {
      label: "Produtividade média",
      value: formatDecimal(kpis?.produtividade_media ?? null, " kg/ha"),
      icon: "solar:leaf-linear",
    },
    {
      label: "Chuva média",
      value: formatDecimal(kpis?.chuva_media ?? null, " mm"),
      icon: "solar:cloud-rain-linear",
    },
    {
      label: "Períodos analisados",
      value: kpis ? kpis.periodos.toLocaleString("pt-BR") : "—",
      icon: "solar:calendar-linear",
    },
    {
      label: "Observações",
      value: kpis ? kpis.observacoes.toLocaleString("pt-BR") : "—",
      icon: "solar:document-text-linear",
    },
  ];
  const managerKpis = [
    {
      label: "Municípios no recorte",
      value: kpis ? kpis.total_municipios.toLocaleString("pt-BR") : "—",
      icon: "solar:map-point-wave-linear",
    },
    ...commonKpis.slice(0, 2),
    {
      label: "Correlação chuva × produtividade",
      value: formatDecimal(kpis?.correlacao ?? null),
      icon: "solar:chart-2-linear",
    },
    ...commonKpis.slice(2),
  ];
  const kpiCards = audience === "producer" ? commonKpis : managerKpis;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary">
            {content.eyebrow}
          </p>
          <h1>{content.title}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{content.description}</p>
        </div>
        <div className="flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
          <Icon icon={content.scopeIcon} className="text-lg text-primary" aria-hidden="true" />
          <span>{content.scopeLabel}</span>
        </div>
      </div>

      <CardBox>
        <form onSubmit={handleSubmit} className="grid items-end gap-4 md:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="culture-filter" className="text-sm font-semibold">
              Cultura
            </label>
            <Select value={culture} onValueChange={setCulture}>
              <SelectTrigger id="culture-filter" className="w-full">
                <SelectValue placeholder="Selecione uma cultura" />
              </SelectTrigger>
              <SelectContent>
                {CULTURES.map((item) => (
                  <SelectItem key={item.code} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="from-year-filter" className="text-sm font-semibold">
              Ano inicial
            </label>
            <Select
              value={String(fromYear)}
              onValueChange={(value) => {
                const year = Number(value);
                setFromYear(year);
                if (year > toYear) setToYear(year);
              }}
            >
              <SelectTrigger id="from-year-filter" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="to-year-filter" className="text-sm font-semibold">
              Ano final
            </label>
            <Select value={String(toYear)} onValueChange={(value) => setToYear(Number(value))}>
              <SelectTrigger id="to-year-filter" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.filter((year) => year >= fromYear).map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {audience === "technician" && (
            <div className="space-y-2 md:col-span-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-semibold">Municípios</label>
                <span className="text-xs text-muted-foreground">
                  Selecione um ou vários municípios
                </span>
              </div>
              <MunicipalityMultiSelect
                municipalities={municipalities}
                selectedIds={selectedMunicipalityIds}
                onChange={setSelectedMunicipalityIds}
                disabled={isLoadingMunicipalities || municipalities.length === 0}
              />
              <p className="text-xs text-muted-foreground">
                A lista contém somente municípios autorizados da sua região imediata.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 md:col-span-4">
            <Button
              type="submit"
              disabled={
                isLoading ||
                isLoadingMunicipalities ||
                (audience === "technician" && selectedMunicipalityIds.length === 0)
              }
              aria-busy={isLoading || isLoadingMunicipalities}
            >
              <Icon
                icon={
                  isLoading || isLoadingMunicipalities
                    ? "solar:refresh-linear"
                    : "solar:filter-linear"
                }
                className={isLoading || isLoadingMunicipalities ? "animate-spin" : ""}
                aria-hidden="true"
              />
              {isLoading || isLoadingMunicipalities ? "Carregando..." : "Aplicar filtros"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Período disponível: 2010 a 2021. {content.scopeDescription}
            </p>
          </div>
        </form>
      </CardBox>

      {error && (
        <Alert variant="destructive">
          <Icon icon="solar:danger-triangle-linear" aria-hidden="true" />
          <AlertTitle>Erro ao consultar análises</AlertTitle>
          <AlertDescription className="flex flex-wrap items-center gap-3">
            <span>{error}</span>
            <Button
              type="button"
              variant="outlineerror"
              size="sm"
              onClick={() => {
                if (audience === "technician" && municipalities.length === 0) {
                  void loadMunicipalities();
                  return;
                }
                void loadAnalysis(culture, fromYear, toYear, selectedMunicipalityIds);
              }}
            >
              Tentar novamente
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading && !analysis ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Carregando indicadores">
          {Array.from({ length: audience === "producer" ? 4 : 6 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-lg border border-border bg-card" />
          ))}
        </div>
      ) : analysis ? (
        <>
          <div
            className={
              audience === "producer"
                ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            }
          >
            {kpiCards.map((item) => (
              <CardBox key={item.label} className="relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-xl font-bold tabular-nums text-foreground">{item.value}</p>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon icon={item.icon} className="text-xl" aria-hidden="true" />
                  </span>
                </div>
              </CardBox>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {analysis.graficos.map((chart, index) => (
              <div
                key={chart.codigo}
                className={index === 0 ? "xl:col-span-2" : undefined}
              >
                <AnalysisChartCard chart={chart} />
              </div>
            ))}
          </div>

          {analysis.insights.length > 0 && (
            <CardBox>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-warning-soft text-warning">
                  <Icon icon="solar:lightbulb-bolt-linear" className="text-xl" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{content.insightsTitle}</h2>
                  <p className="text-sm text-muted-foreground">{content.insightsDescription}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {analysis.insights.map((insight) => (
                  <li key={insight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 shrink-0 text-lg text-success"
                      aria-hidden="true"
                    />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardBox>
          )}
        </>
      ) : null}
    </div>
  );
}

export function ProducerAnalyses() {
  return <AgriculturalAnalyses audience="producer" />;
}

export function TechnicianAnalyses() {
  return <AgriculturalAnalyses audience="technician" />;
}

export function ManagerAnalyses() {
  return <AgriculturalAnalyses audience="manager" />;
}
