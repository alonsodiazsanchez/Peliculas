# Cine (Cartelera y Reservas)
 
Gestión de películas, salas y reservas de asientos con API REST e interfaz web.
 
## Tecnologías
Express, Prisma, SQLite · React, Vite · Git, GitHub, Render
 
## Estructura
- backend/   API Express + Prisma + SQLite (Modelos de Película, Sala, Sesión y Reserva)
- frontend/  Interfaz React + Vite (Vista de cartelera, detalle de película y selección de asientos)
 
## Ejecución en local
1. Backend: copiar backend/.env.example a backend/.env, npm install,
   npx prisma migrate dev, npm run dev
2. Frontend: copiar frontend/.env.example a frontend/.env,
   npm install, npm run dev
 
## Variables de entorno
Ver backend/.env.example y frontend/.env.example (sin valores secretos).
 
## Despliegue
- Frontend: https://onrender.com
- API:      https://onrender.com
- Nota: la base de datos SQLite del plan gratuito es efímera y los cambios en las reservas se reiniciarán con el servidor.