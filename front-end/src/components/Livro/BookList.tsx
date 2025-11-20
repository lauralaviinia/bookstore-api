import { useEffect, useState } from "react";
import axios from "axios";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";

interface Book {
  id: number;
  title: string;
  tipo: "lidos" | "para-ler";
}

export default function BookList({ tipo }: { tipo: "lidos" | "para-ler" }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [editing, setEditing] = useState<Book | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  async function loadBooks() {
    try {
      const res = await axios.get(`http://localhost:3000/books?tipo=${tipo}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteBook(id: number) {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      loadBooks();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadBooks();
  }, [tipo]);

  return (
    <div style={{ marginBottom: 40 }}>
      <h2>Lista: {tipo === "lidos" ? "Lidos" : "Para ler"}</h2>

      <button onClick={() => setOpenAddModal(true)} style={{ marginBottom: 10 }}>
        Adicionar Livro
      </button>

      <AddBookModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdded={loadBooks}
        tipo={tipo}
      />

      <div>
        {books.map((b) => (
          <div key={b.id} style={{ marginBottom: 10, display: "flex", gap: 10 }}>
            <span>{b.title}</span>
            <button onClick={() => setEditing(b)}>Editar</button>
            <button onClick={() => deleteBook(b.id)}>Excluir</button>
          </div>
        ))}
      </div>

      {editing && (
        <EditBookModal
          book={editing}
          onClose={() => setEditing(null)}
          onUpdate={loadBooks}
        />
      )}
    </div>
  );
}
