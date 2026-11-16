import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.pelicula.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: "Origen",
      genero: "Ciencia Ficción",
      director: "Christopher Nolan",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
