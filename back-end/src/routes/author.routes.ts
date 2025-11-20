import { Router } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from "../controllers/author.controller";
import { validateBody } from "../middleware/validate";
import { createAuthorSchema, updateAuthorSchema } from "../schemas/author.schemas";

const router = Router();

/**
 * @openapi

router.get("/", getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *  get:
 *    summary: Get author by id (includes books and their categories)
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Author object
 *      404:
 *        description: Not found
 */
router.get("/:id", getAuthorById);

/**
 * @openapi
 * /authors:
 *  post:
 *    summary: Create an author
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      201:
 *        description: Created
 */
router.post("/", validateBody(createAuthorSchema), createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *  put:
 *    summary: Update an author
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: Updated
 */
router.put("/:id", validateBody(updateAuthorSchema), updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *  delete:
 *    summary: Delete an author
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: Deleted
 */
router.delete("/:id", deleteAuthor);

export default router;
