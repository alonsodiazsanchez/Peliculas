import prisma from "../lib/prisma.js";


export async function listarPeliculas(req, res) {
  try {
    const peliculas = await prisma.pelicula.findMany({
      orderBy: { id: "asc" }
    });
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las películas" });
  }
}


export async function obtenerPelicula(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }

    const pelicula = await prisma.pelicula.findUnique({
      where: { id }
    });

    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener la película" });
  }
}

// POST /api/peliculas
export async function crearPelicula(req, res) {
  try {
    const { titulo, genero, director } = req.body;
    
    const pelicula = await prisma.pelicula.create({
      data: {
        titulo: titulo.trim(),
        genero: genero?.trim() || null, // Al ser opcional (String?) puede guardarse como nulo
        director: director.trim()
      }
    });
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la película" });
  }
}


export async function actualizarPelicula(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }

    const existente = await prisma.pelicula.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    const { titulo, genero, director } = req.body;
    const datos = {};

    if (titulo !== undefined) {
      if (typeof titulo !== "string" || titulo.trim().length < 3) {
        return res.status(400).json({ error: "El titulo debe tener al menos 3 caracteres" });
      }
      datos.titulo = titulo.trim();
    }

    if (genero !== undefined) {
      datos.genero = typeof genero === "string" && genero.trim() ? genero.trim() : null;
    }

    if (director !== undefined) {
      if (typeof director !== "string" || director.trim().length < 2) {
        return res.status(400).json({ error: "El director debe tener al menos 2 caracteres" });
      }
      datos.director = director.trim();
    }

    const pelicula = await prisma.pelicula.update({
      where: { id },
      data: datos
    });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la película" });
  }
}


export async function eliminarPelicula(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }

    const existente = await prisma.pelicula.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    await prisma.pelicula.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la película" });
  }
}
