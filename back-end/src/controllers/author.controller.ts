import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllAuthors = async (_req: Request, res: Response) => {
  const authors = await prisma.author.findMany({
    include: { books: { include: { category: true } } }
  });
  res.json(authors);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const author = await prisma.author.findUnique({
    where: { id },
    include: { books: { include: { category: true } } }
  });
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
};

export const createAuthor = async (req: Request, res: Response) => {
  const data = req.body;
  const author = await prisma.author.create({ data });
  res.status(201).json(author);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const author = await prisma.author.update({ where: { id }, data });
  res.json(author);
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.author.delete({ where: { id } });
  res.status(204).send();
};
