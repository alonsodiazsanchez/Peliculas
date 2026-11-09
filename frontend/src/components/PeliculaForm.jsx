import { useState } from "react";

function PeliculaForm({ onCrear }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(evento) {
    evento.preventDefault();
    setEnviando(true);
    const creada = await onCrear({
      titulo: titulo.trim(),
      genero,
      director: director.trim(),
    });
    setEnviando(false);

    // Solo vaciamos si salió bien: si falla, no se pierde lo escrito
    if (creada) {
      setTitulo("");
      setGenero("");
      setDirector("");
    }
  }

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Nueva película</h2>

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
        Género (opcional)
        <input value={genero} onChange={(e) => setGenero(e.target.value)} />
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? "Creando..." : "Crear película"}
      </button>
    </form>
  );
}

export default PeliculaForm;
