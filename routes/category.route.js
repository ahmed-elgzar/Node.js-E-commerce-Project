import express from "express";
import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidator.js";

import {
  getCategory,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import subCategoryRoute from "./subCategory.route.js";

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRoute);

router.get("/", getCategories);
router.get("/:id", getCategoryValidator, getCategory);
router.post("/", createCategoryValidator, createCategory);
router.put("/:id", updateCategoryValidator, updateCategory);
router.delete("/:id", deleteCategoryValidator, deleteCategory);

export default router;
