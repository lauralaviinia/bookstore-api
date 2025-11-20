import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller";
import { validateBody } from "../middleware/validate";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.schemas";

const router = Router();

/**
 * @openapi
 * /categories:
 *  get:
 *    summary: Get all categories
 */
router.get("/", getAllCategories);

/**
 * @openapi
 * /categories/{id}:
 *  get:
 *    summary: Get category by id (includes books and their authors)
 */
router.get("/:id", getCategoryById);

/**
 * @openapi
 * /categories:
 *  post:
 *    summary: Create a category
 */
router.post("/", validateBody(createCategorySchema), createCategory);

/**
 * @openapi
 * /categories/{id}:
 *  put:
 *    summary: Update a category
 */
router.put("/:id", validateBody(updateCategorySchema), updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *  delete:
 *    summary: Delete a category
 */
router.delete("/:id", deleteCategory);

export default router;
