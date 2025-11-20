import { useState } from "react";
import axios from "axios";

export default function EditBookModal({ book, onClose, onUpdate }) {
  const [title, setTitle] = useState(book.title);

  async function save() {
    await axios.put(`http://localhost:3000/books/${book.id}`, { title });
    onUpdate();
    onClose();
  }

  return (
    <div style={{ background: "#eee", padding: 20 }}>
      <h3>Editar livro</h3>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <button onClick={save}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
