import express from "express";

import {
  createSubCategory,
  deletesubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subCateogry.controller.js";

import {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deletesubCategory);

export default router;
