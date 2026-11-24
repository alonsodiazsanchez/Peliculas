import "dotenv/config";
import { fileURLToPath } from "node:url";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.js";

const rutaDb = fileURLToPath(new URL("../../dev.db", import.meta.url));

const adapter = new PrismaBetterSqlite3({ url: `file:${rutaDb}` });
const prisma = new PrismaClient({ adapter });

export default prisma;

