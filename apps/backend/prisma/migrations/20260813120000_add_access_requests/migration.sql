CREATE TYPE "AccessRequestStatus" AS ENUM ('PENDENTE', 'APROVADA', 'RECUSADA');

CREATE TABLE "access_requests" (
  "id" TEXT NOT NULL,
  "protocol" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password_hash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL,
  "municipio_id" INTEGER,
  "regiao_imediata_id" INTEGER,
  "document_name" TEXT NOT NULL,
  "document_mime_type" TEXT NOT NULL,
  "document_data" BYTEA NOT NULL,
  "status" "AccessRequestStatus" NOT NULL DEFAULT 'PENDENTE',
  "rejection_reason" TEXT,
  "reviewed_by" TEXT,
  "reviewed_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "access_requests_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "access_requests_protocol_key" ON "access_requests"("protocol");
CREATE UNIQUE INDEX "access_requests_email_key" ON "access_requests"("email");
CREATE INDEX "access_requests_status_created_at_idx" ON "access_requests"("status", "created_at");
CREATE INDEX "access_requests_regiao_imediata_id_idx" ON "access_requests"("regiao_imediata_id");

ALTER TABLE "access_requests"
ADD CONSTRAINT "access_requests_municipio_id_fkey"
FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
