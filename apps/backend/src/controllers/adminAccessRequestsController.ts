import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

const decisionSchema = z
  .object({
    decision: z.enum(["APROVAR", "RECUSAR"]),
    reason: z.string().trim().max(500).optional(),
  })
  .superRefine((data, context) => {
    if (data.decision === "RECUSAR" && !data.reason) {
      context.addIssue({
        code: "custom",
        path: ["reason"],
        message: "Informe o motivo da recusa",
      });
    }
  });

export class AdminAccessRequestsController {
  async index(request: Request, response: Response) {
    const status = z
      .enum(["PENDENTE", "APROVADA", "RECUSADA"])
      .optional()
      .parse(request.query.status);
    const requests = await prisma.accessRequest.findMany({
      where: status ? { status } : undefined,
      select: {
        id: true,
        protocol: true,
        name: true,
        email: true,
        role: true,
        municipioId: true,
        regiaoImediataId: true,
        documentName: true,
        documentMimeType: true,
        status: true,
        rejectionReason: true,
        createdAt: true,
        reviewedAt: true,
        municipio: { select: { nome: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return response.json({ requests });
  }

  async document(request: Request, response: Response) {
    const id = z.string().uuid().parse(request.params.id);
    const accessRequest = await prisma.accessRequest.findUnique({
      where: { id },
      select: { documentData: true, documentMimeType: true, documentName: true },
    });
    if (!accessRequest) throw new AppError("Solicitação não encontrada", 404);

    response.setHeader("Content-Type", accessRequest.documentMimeType);
    response.setHeader(
      "Content-Disposition",
      `inline; filename*=UTF-8''${encodeURIComponent(accessRequest.documentName)}`,
    );
    return response.send(Buffer.from(accessRequest.documentData));
  }

  async decide(request: Request, response: Response) {
    if (!request.user) throw new AppError("Não autorizado", 401);
    const id = z.string().uuid().parse(request.params.id);
    const data = decisionSchema.parse(request.body);
    const accessRequest = await prisma.accessRequest.findUnique({ where: { id } });

    if (!accessRequest) throw new AppError("Solicitação não encontrada", 404);
    if (accessRequest.status !== "PENDENTE") {
      throw new AppError("Esta solicitação já foi analisada", 409);
    }

    if (data.decision === "RECUSAR") {
      const rejected = await prisma.accessRequest.update({
        where: { id },
        data: {
          status: "RECUSADA",
          rejectionReason: data.reason,
          reviewedBy: request.user.id,
          reviewedAt: new Date(),
        },
        select: { id: true, status: true, reviewedAt: true },
      });
      return response.json({ message: "Solicitação recusada", solicitation: rejected });
    }

    const userExists = await prisma.user.findUnique({
      where: { email: accessRequest.email },
      select: { id: true },
    });
    if (userExists) throw new AppError("O e-mail já possui uma conta", 409);

    const result = await prisma.$transaction(async (transaction) => {
      const updated = await transaction.accessRequest.updateMany({
        where: { id, status: "PENDENTE" },
        data: {
          status: "APROVADA",
          rejectionReason: null,
          reviewedBy: request.user!.id,
          reviewedAt: new Date(),
        },
      });
      if (updated.count !== 1) throw new AppError("Esta solicitação já foi analisada", 409);

      const user = await transaction.user.create({
        data: {
          name: accessRequest.name,
          email: accessRequest.email,
          password: accessRequest.passwordHash,
          role: accessRequest.role,
          municipio:
            accessRequest.role === "PRODUTOR" ? String(accessRequest.municipioId) : null,
          regiaoImediataId:
            accessRequest.role === "TECNICO_COOPERATIVA"
              ? accessRequest.regiaoImediataId
              : null,
          uf: null,
        },
        select: { id: true, name: true, email: true, role: true },
      });
      return user;
    });

    return response.json({ message: "Solicitação aprovada e acesso liberado", user: result });
  }
}
