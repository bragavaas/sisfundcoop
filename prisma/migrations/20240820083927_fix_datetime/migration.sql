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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
