import "dotenv/config";

export function comprobarApiKey(req, res, next) {
  const apiKey = req.header("x-api-key");
  const claveValida = process.env.API_KEY || "clase-frameworks-2026";

  if (!apiKey || apiKey !== claveValida) {
    return res.status(401).json({
      error: "Clave de API incorrecta o ausente",
    });
  }
  next();





