import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CreateBook from "./components/Livro/CreateBook";
import EditBook from "./components/Livro/EditBook";
import ThemeToggleFloating from "./components/ThemeToggleFloating";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggleFloating toggleColorMode={toggleColorMode} mode={mode} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
