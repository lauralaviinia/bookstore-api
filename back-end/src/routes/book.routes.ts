import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/book.controller";
import { validateBody } from "../middleware/validate";
import { createBookSchema, updateBookSchema } from "../schemas/book.schemas";

const router = Router();

/**
 * @openapi
 * /books:
 *  get:
 *    summary: Get all books (includes author and category)
 */
router.get("/", getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *  get:
 *    summary: Get book by id (includes author and category)
 */
router.get("/:id", getBookById);

/**
 * @openapi
 * /books:
 *  post:
 *    summary: Create a book
 */
router.post("/", validateBody(createBookSchema), createBook);

/**
 * @openapi
 * /books/{id}:
 *  put:
 *    summary: Update a book
 */
router.put("/:id", validateBody(updateBookSchema), updateBook);

/**
 * @openapi
 * /books/{id}:
 *  delete:
 *    summary: Delete a book
 */
router.delete("/:id", deleteBook);

export default router;
