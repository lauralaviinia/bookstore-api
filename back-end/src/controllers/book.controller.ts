import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllBooks = async (_req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    include: { author: true, category: true }
  });
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = await prisma.book.findUnique({
    where: { id },
    include: { author: true, category: true }
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, published, authorName, categoryId } = req.body;

    if (!title || !authorName || !categoryId) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }

    let author = await prisma.author.findFirst({
      where: { name: authorName },
    });

    if (!author) {
      author = await prisma.author.create({
        data: {
          name: authorName,
          email: `${authorName.replace(/\s+/g, "").toLowerCase()}@example.com`,
        },
      });
    }

    const book = await prisma.book.create({
      data: {
        title,
        published: published ? new Date(published) : new Date(),
        categoryId: Number(categoryId),
        authorId: author.id,
      }
    });

    res.status(201).json(book);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar livro" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, published, authorName, categoryId } = req.body;

    let updateData: any = {};

    if (title) updateData.title = title;
    if (published) updateData.published = new Date(published);
    if (categoryId) updateData.categoryId = Number(categoryId);

    if (authorName) {
      let author = await prisma.author.findFirst({
        where: { name: authorName },
      });

      if (!author) {
        author = await prisma.author.create({
          data: {
            name: authorName,
            email: `${authorName.replace(/\s+/g, "").toLowerCase()}@example.com`,
          },
        });
      }

      updateData.authorId = author.id;
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedBook);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar livro" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.book.delete({ where: { id } });
  res.status(204).send();
};
