import { useState } from "react";

function PeliculaItem({ pelicula, onGuardar, onEliminar }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(pelicula.titulo);
  const [genero, setGenero] = useState(pelicula.genero ?? "");
  const [director, setDirector] = useState(pelicula.director);
  const [guardando, setGuardando] = useState(false);

  function empezarEdicion() {
    // partimos siempre de los datos actuales de la película
    setTitulo(pelicula.titulo);
    setGenero(pelicula.genero ?? "");
    setDirector(pelicula.director);
    setEditando(true);
  }

  async function manejarSubmit(evento) {
    evento.preventDefault();
    setGuardando(true);
    const ok = await onGuardar(pelicula.id, {
      titulo: titulo.trim(),
      genero,
      director: director.trim(),
    });
    setGuardando(false);
    if (ok) setEditando(false); // si falla, se queda abierto con lo escrito
  }

  if (editando) {
    return (
      <article>
        <form className="edicion" onSubmit={manejarSubmit}>
          <label>
            Título
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              minLength={3}
            />
          </label>
          <label>
            Director
            <input
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
              minLength={3}
            />
          </label>
          <label>
            Género
            <input value={genero} onChange={(e) => setGenero(e.target.value)} />
          </label>
          <div>
            <button type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article>
      <h3>{pelicula.titulo}</h3>
      <p>Director: {pelicula.director}</p>
      <p>Género: {pelicula.genero || "Sin género"}</p>
      <button onClick={empezarEdicion}>Editar</button>
      <button onClick={() => onEliminar(pelicula.id)}>Eliminar</button>
    </article>
  );
}

export default PeliculaItem;
