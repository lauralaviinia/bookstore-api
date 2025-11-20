import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,

} from "@mui/material";
import { PersonAdd as RegisterIcon } from "@mui/icons-material";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const nameSchema = z.string().min(2, "O nome deve ter pelo menos 2 caracteres");
const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(4, "A senha deve ter pelo menos 4 caracteres");

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !nameSchema.safeParse(name).success ||
      !emailSchema.safeParse(email).success ||
      !passwordSchema.safeParse(password).success
    ) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3333/register", {
        nome: name,
        email,
        password,
      });

      setSuccess(response.data.message || "Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/"); 
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Erro ao cadastrar. Tente novamente."
        );
      } else {
        setError("Erro de conexão com o servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f7f7f7" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350, maxWidth: "90%" }}>
        <Box textAlign="center" mb={2}>
          <RegisterIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
          <Typography variant="h6" component="h1" fontWeight={600} mb={1}>
            Crie sua conta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Preencha seus dados para continuar
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                <span>Cadastrando...</span>
              </Box>
            ) : (
              "Cadastrar"
            )}
          </Button>

          <Button
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/")}
          >
            Já tem uma conta? Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
