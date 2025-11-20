import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [authorName, setAuthorName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/categories").then((res) => {
      setCategories(res.data);
    });

    axios.get(`http://localhost:3000/books/${id}`).then((res) => {
      const b = res.data;
      setTitle(b.title);
      setPublished(b.published.substring(0, 10)); // yyyy-mm-dd
      setAuthorName(b.author?.name || "");
      setCategoryId(b.categoryId);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put(`http://localhost:3000/books/${id}`, {
      title,
      published,
      authorName: authorName || null,
      categoryId,
    });

    alert("Livro atualizado!");
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Editar Livro</h1>

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

        <br />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
