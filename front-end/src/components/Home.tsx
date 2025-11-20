import { useState } from "react";
import { Button } from "@mui/material";
import BookList from "../components/Livro/BookList";

function Home() {
  const [view, setView] = useState<"lidos" | "para-ler">("para-ler");


  return (
    <div style={{ padding: 20 }}>
      <h1>Minha Estante</h1>

      
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Button
          variant={view === "para-ler" ? "contained" : "outlined"}
          onClick={() => setView("para-ler")}
        >
          Livros para ler
        </Button>
        <Button
          variant={view === "lidos" ? "contained" : "outlined"}
          onClick={() => setView("lidos")}
        >
          Livros lidos
        </Button>
      </div>

      <BookList tipo={view} />
    </div>
  );
}

export default Home;



