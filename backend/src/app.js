import express from "express";
import cineRouter from "./routes/cine.routes.js";
import cors from "cors";

const app = express();

const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];
 
app.use(cors({ origin: origenes }));   // antes del middleware de x-api-key
app.use(express.json());
 
app.get("/", (req, res) => res.json({ estado: "ok" }));   // ruta de salud
 
// ... rutas y manejador de errores global
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));


app.use(
  cors({ origin: ["http://localhost:5173", "http://localhost:4173"] })
);
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    nombre: "API de Cine Basica",
    estado: "funcionando"
  });
});

app.use("/api/peliculas", cineRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {     // manejador de errores global
  console.error(err);                  // el detalle va a los LOGS
  res.status(500).json({
    error: PRODUCCION ? "Error interno del servidor" : err.message,
  });
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

