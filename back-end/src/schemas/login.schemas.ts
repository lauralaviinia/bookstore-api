import { Router, Request, Response } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === "email@example.com" && password === "1234") {
    return res.json({
      message: "Login bem-sucedido!",
      user: { id: 1, name: "Email", email },
    });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
});

export default router;
