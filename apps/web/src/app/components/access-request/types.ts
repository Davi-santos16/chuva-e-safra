export type ProfileType = "produtor" | "tecnico";

export type UploadedFile = { id: string; name: string; size: number; type: string; file: File; preview?: string };
export const profileCopy = {
  produtor: { label: "Produtor rural", description: "Para quem produz, administra ou trabalha diretamente em uma propriedade rural.", examples: "Proprietário, posseiro, arrendatário, assentado e trabalhador rural." },
  tecnico: { label: "Técnico agrícola", description: "Para profissionais que prestam assistência técnica no campo.", examples: "Técnico, agrônomo, extensionista, cooperativa ou consultor." },
} as const;
