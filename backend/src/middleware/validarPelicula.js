export function validarPelicula(req, res, next) {
  const { titulo } = req.body;
  const { director } = req.body;

  if (typeof titulo !== "string" || titulo.trim().length < 3) {
    return res.status(400).json({
      error: "El titulo es obligatorio y debe tener al menos 3 caracteres"
    });
  }

   if (typeof director !== "string" || director.trim().length < 3) {
    return res.status(400).json({
      error: "El director es obligatorio y debe tener al menos 3 caracteres"
    });
  }

  next();
}
