-- CreateTable
CREATE TABLE "Campanha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataInicio" TEXT NOT NULL,
    "dataTermino" TEXT NOT NULL,
    "participantes" TEXT NOT NULL
);
