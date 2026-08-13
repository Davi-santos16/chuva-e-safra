import { hash } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

const createManagedUserSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.email("E-mail inválido").transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  role: z.enum(["ADMIN", "GESTOR_PUBLICO"]),
});

class AdminUsersController {
  async index(_request: Request, response: Response) {
    const [users, roleGroups] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAT: true,
          updatedAT: true,
        },
        orderBy: { createdAT: "desc" },
      }),
      prisma.user.groupBy({
        by: ["role"],
        _count: { _all: true },
      }),
    ]);

    const porPerfil = Object.fromEntries(
      roleGroups.map((group) => [group.role, group._count._all]),
    );

    return response.json({
      resumo: {
        total: users.length,
        administradores: porPerfil.ADMIN ?? 0,
        produtores: porPerfil.PRODUTOR ?? 0,
        tecnicos: porPerfil.TECNICO_COOPERATIVA ?? 0,
        gestores: porPerfil.GESTOR_PUBLICO ?? 0,
      },
      users,
    });
  }

  async create(request: Request, response: Response) {
    const data = createManagedUserSchema.parse(request.body);
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });

    if (existingUser) {
      throw new AppError("E-mail já está em uso", 409);
    }

    const password = await hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password,
        role: data.role,
        municipio: null,
        regiaoImediataId: null,
        uf: data.role === "GESTOR_PUBLICO" ? "CE" : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAT: true,
      },
    });

    return response.status(201).json({
      message:
        data.role === "GESTOR_PUBLICO"
          ? "Gestor público criado com sucesso"
          : "Administrador criado com sucesso",
      user,
    });
  }
}

export { AdminUsersController };
