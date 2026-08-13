-- CreateTable
CREATE TABLE "municipios" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "regiao_imediata_id" INTEGER NOT NULL,
    "regiao_imediata_nome" TEXT NOT NULL,

    CONSTRAINT "municipios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "municipios_nome_idx" ON "municipios"("nome");

-- CreateIndex
CREATE INDEX "municipios_regiao_imediata_id_idx"
ON "municipios"("regiao_imediata_id");
