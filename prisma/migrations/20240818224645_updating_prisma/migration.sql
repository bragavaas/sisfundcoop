/*
  Warnings:

  - You are about to drop the `Participante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `imagemDoBrinde` on the `Campanha` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Participante";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Participantes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL DEFAULT '',
    "matricula" TEXT NOT NULL DEFAULT '',
    "campanhaId" INTEGER,
    CONSTRAINT "Participantes_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campanha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataInicio" TEXT NOT NULL,
    "dataTermino" TEXT NOT NULL,
    "numeroParticipantes" INTEGER NOT NULL DEFAULT 0,
    "brinde" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Campanha" ("brinde", "dataInicio", "dataTermino", "id", "nome", "numeroParticipantes") SELECT "brinde", "dataInicio", "dataTermino", "id", "nome", "numeroParticipantes" FROM "Campanha";
DROP TABLE "Campanha";
ALTER TABLE "new_Campanha" RENAME TO "Campanha";
CREATE INDEX "campanha_id_unique" ON "Campanha"("id");
CREATE TABLE "new_Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeDoParticipante" TEXT NOT NULL,
    "campanhaId" INTEGER,
    "dataRetirada" TEXT NOT NULL DEFAULT '',
    "horarioRetirada" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Registro_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Registro" ("campanhaId", "id", "nomeDoParticipante") SELECT "campanhaId", "id", "nomeDoParticipante" FROM "Registro";
DROP TABLE "Registro";
ALTER TABLE "new_Registro" RENAME TO "Registro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
