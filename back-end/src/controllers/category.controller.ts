import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    include: { books: { include: { author: true } } }
  });
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = await prisma.category.findUnique({
    where: { id },
    include: { books: { include: { author: true } } }
  });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const data = req.body;
  const category = await prisma.category.create({ data });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const category = await prisma.category.update({ where: { id }, data });
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.category.delete({ where: { id } });
  res.status(204).send();
};
