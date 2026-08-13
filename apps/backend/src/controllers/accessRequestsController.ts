import { randomBytes } from "node:crypto";

import { hash } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
const ALLOWED_DOCUMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"] as const;

const createAccessRequestSchema = z
  .object({
    name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
    email: z.email("E-mail inválido").transform((email) => email.toLowerCase()),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres").max(72),
    role: z.enum(["PRODUTOR", "TECNICO_COOPERATIVA"]),
    municipioId: z.coerce.number().int().positive().optional(),
    regiaoImediataId: z.coerce.number().int().positive().optional(),
    documentName: z
      .string()
      .trim()
      .min(1, "Nome do documento é obrigatório")
      .max(255)
      .refine((name) => !/[\r\n]/.test(name), "Nome de documento inválido"),
    documentMimeType: z.enum(ALLOWED_DOCUMENT_TYPES),
    documentBase64: z.string().min(1, "Documento é obrigatório"),
  })
  .superRefine((data, context) => {
    if (data.role === "PRODUTOR" && !data.municipioId) {
      context.addIssue({
        code: "custom",
        path: ["municipioId"],
        message: "Município é obrigatório para produtor",
      });
    }
    if (data.role === "TECNICO_COOPERATIVA" && !data.regiaoImediataId) {
      context.addIssue({
        code: "custom",
        path: ["regiaoImediataId"],
        message: "Região imediata é obrigatória para técnico",
      });
    }
  });

function createProtocol() {
  return `CSA-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export class AccessRequestsController {
  async create(request: Request, response: Response) {
    const data = createAccessRequestSchema.parse(request.body);
    const documentData = Buffer.from(data.documentBase64, "base64");

    if (!documentData.length || documentData.length > MAX_DOCUMENT_SIZE) {
      throw new AppError("O documento deve ter no máximo 10 MB", 400);
    }

    const [userExists, requestExists] = await Promise.all([
      prisma.user.findUnique({ where: { email: data.email }, select: { id: true } }),
      prisma.accessRequest.findUnique({ where: { email: data.email }, select: { status: true } }),
    ]);

    if (userExists) throw new AppError("E-mail já possui acesso ao sistema", 409);
    if (requestExists) throw new AppError("Já existe uma solicitação para este e-mail", 409);

    if (data.role === "PRODUTOR") {
      const municipio = await prisma.municipio.findUnique({
        where: { id: data.municipioId },
        select: { id: true },
      });
      if (!municipio) throw new AppError("Município não encontrado no Ceará", 400);
    } else {
      const regiao = await prisma.municipio.findFirst({
        where: { regiaoImediataId: data.regiaoImediataId },
        select: { id: true },
      });
      if (!regiao) throw new AppError("Região imediata não encontrada no Ceará", 400);
    }

    const passwordHash = await hash(data.password, 10);
    const accessRequest = await prisma.accessRequest.create({
      data: {
        protocol: createProtocol(),
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
        municipioId: data.role === "PRODUTOR" ? data.municipioId : null,
        regiaoImediataId:
          data.role === "TECNICO_COOPERATIVA" ? data.regiaoImediataId : null,
        documentName: data.documentName,
        documentMimeType: data.documentMimeType,
        documentData,
      },
      select: { protocol: true, status: true, createdAt: true },
    });

    return response.status(201).json({
      message: "Solicitação enviada para análise",
      solicitation: accessRequest,
    });
  }

  async show(request: Request, response: Response) {
    const protocol = z.string().trim().min(1).parse(request.params.protocol);
    const email = z.email("E-mail inválido").parse(request.query.email).toLowerCase();
    const accessRequest = await prisma.accessRequest.findFirst({
      where: { protocol, email },
      select: {
        protocol: true,
        name: true,
        role: true,
        status: true,
        rejectionReason: true,
        createdAt: true,
        reviewedAt: true,
      },
    });

    if (!accessRequest) throw new AppError("Solicitação não encontrada", 404);
    return response.json({ solicitation: accessRequest });
  }
}
