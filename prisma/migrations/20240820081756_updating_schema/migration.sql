/*
  Warnings:

  - You are about to drop the `Participantes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `dataInicio` on the `Campanha` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `dataTermino` on the `Campanha` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Participantes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Participante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL DEFAULT '',
    "matricula" TEXT NOT NULL DEFAULT '',
    "campanhaId" INTEGER,
    CONSTRAINT "Participante_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campanha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataTermino" DATETIME NOT NULL,
    "numeroParticipantes" INTEGER NOT NULL DEFAULT 0,
    "brinde" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Campanha" ("brinde", "dataInicio", "dataTermino", "id", "nome", "numeroParticipantes") SELECT "brinde", "dataInicio", "dataTermino", "id", "nome", "numeroParticipantes" FROM "Campanha";
DROP TABLE "Campanha";
ALTER TABLE "new_Campanha" RENAME TO "Campanha";
CREATE INDEX "campanha_id_unique" ON "Campanha"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
