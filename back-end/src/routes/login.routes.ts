import { Router, Request, Response } from "express";

const router = Router();

const user = {
  id: 1,
  name: "User",
  email: "email@example.com",
  password: "1234"
};

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (email !== user.email) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    return res.json({
      success: true,
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro no login" });
  }
});

export default router;
