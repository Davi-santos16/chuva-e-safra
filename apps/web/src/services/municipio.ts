import { api } from "@/api/config";

export interface Municipality {
  id: number;
  nome: string;
}

interface MunicipalitiesResponse {
  municipios: Municipality[];
}

export interface ImmediateRegion {
  regiaoImediataId: number;
  regiaoImediataNome: string;
}

interface ImmediateRegionsResponse {
  regioes: ImmediateRegion[];
}

export async function getAllMunicipalities() {
  const response = await api.get<MunicipalitiesResponse>("/municipios/todos");
  return response.data.municipios;
}

export async function getTechnicianMunicipalities() {
  const response = await api.get<MunicipalitiesResponse>("/municipios");
  return response.data.municipios;
}

export async function getImmediateRegions() {
  const response = await api.get<ImmediateRegionsResponse>("/municipios/regioes-imediatas");
  return response.data.regioes;
}

// Compatibilidade com os formulários existentes.
export async function Allmunicipios() {
  return { municipios: await getAllMunicipalities() };
}
export async function municipios() {
  return { municipios: await getTechnicianMunicipalities() };
}
export async function regioes() {
  return { regioes: await getImmediateRegions() };
}
