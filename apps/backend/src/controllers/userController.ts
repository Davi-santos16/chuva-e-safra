import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { IUser } from "../types/userInterface";
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';

export class UserController {
    /* async index(request: Request, response: Response) {
        const users = await prisma.user.findMany();

        return response.json({ users });
    } */
    
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            // RECEBENDO OS DADOS COM PADRAO DA INTERFACE
            const data: IUser = request.body;

            // VERIFICANDO SE O EMAIL INFORMADO JA FOI CADASTRADO
            const userExists = await prisma.user.findUnique({
                where: { email: data.email },
            });

            if (userExists) {
                throw new AppError('Email já está em uso', 409);
            }

            // CRIPTOGRAFANDO A SENHA
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // CRIAR O USER
            await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role,
                    municipio: data.role === 'PRODUTOR' ? data.municipio : null,
                    uf: data.role === 'GESTOR_PUBLICO' ? 'CE' : null,
                }
            });

            return response.status(201).json({ message: 'Usuário criado com sucesso' });
        } catch (error) {
            next(error);
        }
    }

}
