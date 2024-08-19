-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeDoParticipante" TEXT NOT NULL DEFAULT '',
    "matriculaDoParticipante" TEXT NOT NULL DEFAULT '',
    "dataRetirada" TEXT NOT NULL DEFAULT '',
    "horarioRetirada" TEXT NOT NULL DEFAULT '',
    "campanhaId" INTEGER,
    CONSTRAINT "Registro_campanhaId_fkey" FOREIGN KEY ("campanhaId") REFERENCES "Campanha" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Registro" ("campanhaId", "dataRetirada", "horarioRetirada", "id", "nomeDoParticipante") SELECT "campanhaId", "dataRetirada", "horarioRetirada", "id", "nomeDoParticipante" FROM "Registro";
DROP TABLE "Registro";
ALTER TABLE "new_Registro" RENAME TO "Registro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
