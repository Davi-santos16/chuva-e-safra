export type ProfileType = "produtor" | "tecnico";
export type RequestStatus = "Pendente" | "Em análise" | "Correção solicitada" | "Reenviada" | "Aprovada" | "Recusada" | "Cancelada";

export type UploadedFile = { id: string; name: string; size: number; type: string; preview?: string };
export type RequestData = {
  profile?: ProfileType; name: string; cpf: string; birthDate: string; email: string; phone: string;
  cep: string; state: string; city: string; address: string; number: string; complement: string; neighborhood: string;
  propertyName: string; municipality: string; relationship: string; cultures: string[]; otherCulture: string;
  formation: string; registration: string; organization: string; workCities: string[]; description: string;
  accessEmail: string; password: string; confirmPassword: string; terms: boolean; privacy: boolean; consent: boolean;
  files: Record<string, UploadedFile | undefined>;
};
export const initialRequest: RequestData = { profile: undefined, name: "", cpf: "", birthDate: "", email: "", phone: "", cep: "", state: "Ceará", city: "", address: "", number: "", complement: "", neighborhood: "", propertyName: "", municipality: "", relationship: "", cultures: [], otherCulture: "", formation: "", registration: "", organization: "", workCities: [], description: "", accessEmail: "", password: "", confirmPassword: "", terms: false, privacy: false, consent: false, files: {} };
export const profileCopy = {
  produtor: { label: "Produtor rural", description: "Para quem produz, administra ou trabalha diretamente em uma propriedade rural.", examples: "Proprietário, posseiro, arrendatário, assentado e trabalhador rural." },
  tecnico: { label: "Técnico agrícola", description: "Para profissionais que prestam assistência técnica no campo.", examples: "Técnico, agrônomo, extensionista, cooperativa ou consultor." },
} as const;
