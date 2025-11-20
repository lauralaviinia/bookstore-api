import { useState } from "react";
import axios from "axios";

export default function AddBookForm({
  tipo,
  onAdd,
}: {
  tipo: "lidos" | "para-ler";
  onAdd: () => void;
}) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await axios.post("http://localhost:3000/books", {
      title,
      tipo,
    });

    setTitle("");
    onAdd();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título do livro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
