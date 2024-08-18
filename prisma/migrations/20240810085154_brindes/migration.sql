/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `participantes` on the `Campanha` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Participantes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "campanhaId" INTEGER,
    CONSTRAINT "Participantes_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeDoParticipante" TEXT NOT NULL,
    "campanhaId" INTEGER NOT NULL,
    "dataRetirada" TEXT NOT NULL,
    "horarioRetirada" TEXT NOT NULL,
    CONSTRAINT "Registro_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "brinde" TEXT NOT NULL DEFAULT '',
    "imagemDoBrinde" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Campanha" ("dataInicio", "dataTermino", "id", "nome") SELECT "dataInicio", "dataTermino", "id", "nome" FROM "Campanha";
DROP TABLE "Campanha";
ALTER TABLE "new_Campanha" RENAME TO "Campanha";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Registro_nomeDoParticipante_campanhaId_key" ON "Registro"("nomeDoParticipante", "campanhaId");
