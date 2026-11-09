/*
  Warnings:

  - You are about to drop the `Director` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `director` to the `Pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Director";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pelicula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "genero" TEXT,
    "director" TEXT NOT NULL
);
INSERT INTO "new_Pelicula" ("genero", "id", "titulo") SELECT "genero", "id", "titulo" FROM "Pelicula";
DROP TABLE "Pelicula";
ALTER TABLE "new_Pelicula" RENAME TO "Pelicula";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
