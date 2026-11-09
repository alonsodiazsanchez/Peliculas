import "dotenv/config";

export function comprobarApiKey(req, res, next) {
  const apiKey = req.header("x-api-key");
  
 
  if (apiKey !== "clase-frameworks-2026") {
    return res.status(401).json({
      error: "Clave de API incorrecta o ausente"
    });
  }
  next();
}




