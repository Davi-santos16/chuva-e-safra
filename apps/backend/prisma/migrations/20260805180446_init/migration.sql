-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PRODUTOR', 'TECNICO_COOPERATIVA', 'GESTOR_PUBLICO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "municipio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
