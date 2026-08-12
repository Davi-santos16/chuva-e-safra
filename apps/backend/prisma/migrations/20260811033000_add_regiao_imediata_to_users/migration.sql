-- A coluna e opcional porque somente tecnicos possuem regiao imediata
-- e usuarios tecnicos existentes ainda precisarao ser atualizados.
ALTER TABLE "users"
ADD COLUMN "regiao_imediata_id" INTEGER;

CREATE INDEX "users_regiao_imediata_id_idx"
ON "users"("regiao_imediata_id");
