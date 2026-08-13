import { api } from "@/api/config";

export interface CreateAccessRequestInput {
  name: string;
  email: string;
  password: string;
  role: "PRODUTOR" | "TECNICO_COOPERATIVA";
  municipioId?: number;
  regiaoImediataId?: number;
  document: File;
}

export interface AccessRequestSummary {
  protocol: string;
  status: "PENDENTE" | "APROVADA" | "RECUSADA";
  createdAt: string;
}

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("Não foi possível ler o documento"));
    reader.readAsDataURL(file);
  });
}

export async function createAccessRequest(input: CreateAccessRequestInput) {
  const documentBase64 = await readAsBase64(input.document);
  const response = await api.post<{
    message: string;
    solicitation: AccessRequestSummary;
  }>("/access-requests", {
    name: input.name,
    email: input.email.toLowerCase(),
    password: input.password,
    role: input.role,
    municipioId: input.municipioId,
    regiaoImediataId: input.regiaoImediataId,
    documentName: input.document.name,
    documentMimeType: input.document.type,
    documentBase64,
  });
  return response.data;
}

export interface AccessRequestStatusData extends AccessRequestSummary {
  name: string;
  role: "PRODUTOR" | "TECNICO_COOPERATIVA";
  rejectionReason?: string | null;
  reviewedAt?: string | null;
}

export async function getAccessRequestStatus(protocol: string, email: string) {
  const response = await api.get<{ solicitation: AccessRequestStatusData }>(
    `/access-requests/${encodeURIComponent(protocol)}`,
    { params: { email } },
  );
  return response.data.solicitation;
}
