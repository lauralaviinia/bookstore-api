import { useState, useEffect } from "react";
import axios from "axios";

import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";

interface Category {
  id: number;
  name: string;
}

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
  tipo: "lidos" | "para-ler";  
}

export default function AddBookModal({ open, onClose, onAdded, tipo }: AddBookModalProps) {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

useEffect(() => {
  axios.get("/categories")
    .then((res) => setCategories(res.data))
    .catch(() => setCategories([]));
}, []);



  const handleSubmit = async () => {
  if (!title || !categoryId) {
    setError("Título e categoria são obrigatórios");
    return;
  }

  try {
    const res = await axios.post("/books", {
  title,
  published: published ? new Date(published) : null,
  authorName: authorName ? authorName : "", 
  categoryId,
  tipo,
});


    console.log("Livro criado:", res.data);

      setTitle("");
      setPublished("");
      setAuthorName("");
      setCategoryId("");
      setError("");

      onAdded();
      onClose();
    } catch (err: any) {
      console.error("Erro ao adicionar livro:", err.response?.data || err);
      setError("Erro ao adicionar o livro. Confira os dados.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: 4,
        borderRadius: 2,
        width: 400,
      }}>
        <Typography variant="h6" mb={2}>
          Adicionar Novo Livro ({tipo === "lidos" ? "Lido" : "Para Ler"})
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Título"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          type="date"
          label="Data de Publicação"
          InputLabelProps={{ shrink: true }}
          margin="normal"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />

        <TextField
          fullWidth
          label="Autor (opcional)"
          margin="normal"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <TextField
          fullWidth
          select
          label="Categoria"
          margin="normal"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Adicionar
        </Button>
      </Box>
    </Modal>
  );
}
