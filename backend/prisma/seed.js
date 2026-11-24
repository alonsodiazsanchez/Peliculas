import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:../dev.db",
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

const peliculas = [{"id":1,"titulo":"Cars","genero":"Animación","director":"John Lasseter"},{"id":2,"titulo":"Toy Story","genero":"Animación","director":"John Lasseter"},{"id":4,"titulo":"Spirited Away","genero":null,"director":"Hayao Miyazaki"},{"id":5,"titulo":"Interstellar","genero":null,"director":"Christopher Nolan"},{"id":6,"titulo":"Gladiator","genero":null,"director":"Ridley Scott"},{"id":7,"titulo":"The Matrix","genero":null,"director":"Lana Wachowski"},{"id":8,"titulo":"Avatar","genero":"Ciencia ficción","director":"James Cameron"},{"id":9,"titulo":"Inception","genero":null,"director":"Christopher Nolan"},{"id":10,"titulo":"F1 la pelicula","genero":"Automivilismo","director":"Joseph Kosinski"}];

for (const p of peliculas) {
  await prisma.pelicula.upsert({ where: { id: p.id }, update: {}, create: p });
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
