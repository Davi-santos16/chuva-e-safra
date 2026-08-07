import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/AppError';

// SCHEMA DE VALIDAÇÃO DOS DADOS
const userSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),

    email: z.string()
        .email('Email inválido')
        .min(5, 'Email deve ter pelo menos 5 caracteres'),

    password: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),

    role: z.enum(['PRODUTOR', 'TECNICO_COOPERATIVA', 'GESTOR_PUBLICO'], {
        message: 'Role inválida'
    }),

    municipio: z.string(),
});

export const checkInputsUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // VERIFICAR SE FORAM PASSADO OS DADOS
        if (!req.body) {
            throw new AppError('Nenhum dado foi enviado', 400);
        }

        // VALIDAR OS DADOS
        const validatedData = userSchema.parse(req.body);

        // PASSAR OS DADOS VALIDADOS
        req.body = validatedData;

        next();
    } catch (error) {
        next(error);
    }
};