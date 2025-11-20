import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [authorName, setAuthorName] = useState(""); // usuário digita autor
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/books", {
      title,
      published,
      authorName: authorName || null, // se vazio → null
      categoryId,
    });

    alert("Livro criado com sucesso!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Criar Livro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Data de Publicação</label>
          <br />
          <input
            type="date"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>

        <div>
          <label>Autor</label>
          <br />
          <input
            placeholder="Digite o autor (opcional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <div>
          <label>Categoria</label>
          <br />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">Selecione...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
