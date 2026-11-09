# Ejercicio guiado 2 — React para tu API de películas (Bloque1)

Tu backend del Bloque 1 es una API de **películas** (`titulo`, `genero`, `director`),
no de tareas. He seguido los pasos de la guía adaptando el contrato:

| Guía (tareas)                  | Tu proyecto (películas)                          |
|--------------------------------|--------------------------------------------------|
| `/api/tareas`                  | `/api/peliculas`                                 |
| titulo, descripcion, completada| titulo, director, genero (opcional)              |
| Completar / Reabrir (PATCH)    | **Editar** (PATCH con titulo/director/genero)    |
| `TareaItem`, `TareaForm`       | `PeliculaItem`, `PeliculaForm`                   |
| `tareasApi.js`                 | `peliculasApi.js`                                |

Tu API no tiene campo `completada`, así que el PATCH de la guía se practica
editando la película (equivale al reto 3 de la guía). El DELETE de tu API
devuelve 204 sin cuerpo: `peticion()` ya lo admite.

## Qué contiene este zip
- Todo está ya dentro de `Bloque1/` (backend en la raíz, frontend en `cine-frontend/`).

## Pasos
1. Estructura (paso 1): carpeta `ejercicio-cine/` con `Bloque1/` y `cine-frontend/` dentro.
2. Backend (pasos 2-3), en `Bloque1/`:
   ```
   npm install
   npm run dev
   ```
   Punto de control 1: http://localhost:3000/api/peliculas devuelve un array JSON.
   Un POST sin `x-api-key` devuelve 401.
3. Frontend (pasos 4-16), en `cine-frontend/` (segunda terminal):
   ```
   npm install
   npm run dev
   ```
   Abre http://localhost:5173 (NO 127.0.0.1).
   > Si prefieres seguir la guía al pie de la letra: `npm create vite@latest cine-frontend -- --template react`
   > y copia encima `src/`, `vite.config.js`, `.env` y `.env.example` de este zip
   > (borra antes `src/App.css` y las imágenes de la plantilla).
4. En la web escribe la API key `clase-frameworks-2026` (la de tu `.env`) y pulsa
   "Guardar durante la sesión".
5. Build (paso 17): `npm run build` y `npm run preview` → http://localhost:4173

## Pruebas finales (sección 24 de la guía)
| Prueba | Resultado esperado |
|---|---|
| Abrir localhost:5173 | Lista de películas |
| Backend detenido + recargar | «No se puede conectar…» + botón Reintentar |
| Crear con clave | Película nueva; en Network: OPTIONS + POST (201) |
| Crear sin clave | Aviso de error (401); formulario y lista siguen visibles, lo escrito se conserva |
| Editar | PATCH + tarjeta actualizada; F5 mantiene el cambio |
| Eliminar | confirmación + DELETE (204) + desaparece |
| F5 | datos desde SQLite, clave sigue en sessionStorage |
| Cerrar pestaña y abrir otra | datos siguen, la clave ya no está |
| build + preview | dist sin errores y carga datos |

## Notas
- `peticion()` usa `cuerpo.error`, que es justo el formato de errores de tu API.
- Validaciones coherentes con tu backend: título y director mín. 3 caracteres (POST).
- `prisma7.config.ts` tiene una ruta absoluta de Windows (`C:/Users/Tarde/...`).
  No afecta a la ejecución (usa `DATABASE_URL` del `.env`), pero conviene cambiarla
  a `file:./dev.db` antes de subir el proyecto en el Bloque 3.
- No subas `.env` a Git (ya está en tu `.gitignore`); `.env.example` sí.
- Antes del Bloque 3, si hiciste `git init` dentro de `Bloque1` o `cine-frontend`, borra esa carpeta `.git`.
