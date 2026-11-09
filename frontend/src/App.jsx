import { useCallback, useEffect, useState } from "react";
import {
  obtenerPeliculas,
  crearPelicula,
  modificarPelicula,
  eliminarPelicula,
} from "./services/peliculasApi";
import PeliculaItem from "./components/PeliculaItem";
import PeliculaForm from "./components/PeliculaForm";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [aviso, setAviso] = useState(null); // { tipo: "ok" | "error", texto }
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem("apiKey") ?? ""
  );

  const cargarPeliculas = useCallback(async () => {
    try {
      setErrorCarga("");
      setPeliculas(await obtenerPeliculas());
    } catch (err) {
      setErrorCarga(err.message);
    }
  }, []);

  useEffect(() => {
    cargarPeliculas().finally(() => setCargando(false));
  }, [cargarPeliculas]);

  function reintentar() {
    setCargando(true);
    cargarPeliculas().finally(() => setCargando(false));
  }

  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
  }

  function guardarApiKey() {
    sessionStorage.setItem("apiKey", apiKey);
    mostrarAviso("ok", "Clave guardada durante la sesión");
  }

  // POST
  async function manejarCrear(datos) {
    try {
      const nueva = await crearPelicula(datos);
      setPeliculas((actuales) => [...actuales, nueva]); // copia nueva, sin push
      mostrarAviso("ok", "Película creada");
      return true; // el formulario se vacía
    } catch (err) {
      mostrarAviso("error", err.message);
      return false; // conserva lo escrito
    }
  }

  // PATCH
  async function manejarGuardar(id, cambios) {
    try {
      const actualizada = await modificarPelicula(id, cambios);
      setPeliculas((actuales) =>
        actuales.map((p) =>
          // copia nueva; si la API no devuelve la película, aplicamos el cambio local
          p.id === id ? { ...p, ...cambios, ...actualizada } : p
        )
      );
      mostrarAviso("ok", "Película actualizada");
      return true; // el item cierra el modo edición
    } catch (err) {
      mostrarAviso("error", err.message);
      return false; // el item sigue en edición con lo escrito
    }
  }

  // DELETE
  async function manejarEliminar(id) {
    if (!window.confirm("¿Eliminar esta película?")) return;
    try {
      await eliminarPelicula(id);
      setPeliculas((actuales) => actuales.filter((p) => p.id !== id));
      mostrarAviso("ok", "Película eliminada");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  return (
    <main>
      <h1>Gestor de películas</h1>

      <section>
        <h2>Acceso a operaciones protegidas</h2>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API key"
        />
        <button onClick={guardarApiKey}>Guardar durante la sesión</button>
      </section>

      {aviso && (
        <p className={`aviso aviso-${aviso.tipo}`} role="status">
          {aviso.texto}
        </p>
      )}

      <PeliculaForm onCrear={manejarCrear} />

      <h2>Películas ({peliculas.length})</h2>

      {cargando && <p>Cargando...</p>}

      {!cargando && errorCarga && (
        <div role="alert">
          <p>{errorCarga}</p>
          <button onClick={reintentar}>Reintentar</button>
        </div>
      )}

      {!cargando && !errorCarga && peliculas.length === 0 && (
        <p>No hay películas.</p>
      )}

      {!cargando &&
        !errorCarga &&
        peliculas.map((pelicula) => (
          <PeliculaItem
            key={pelicula.id}
            pelicula={pelicula}
            onGuardar={manejarGuardar}
            onEliminar={manejarEliminar}
          />
        ))}
    </main>
  );
}

export default App;
