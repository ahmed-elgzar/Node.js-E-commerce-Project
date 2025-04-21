import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID format"),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 2 })
    .withMessage("subCategory name is too short")
    .isLength({ max: 32 })
    .withMessage("subCategory name is too long"),
  check("category")
    .notEmpty()
    .withMessage("this sub category must belong to a parent category")
    .isMongoId()
    .withMessage("Invalid category ID format"),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID format"),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory ID format"),
  validatorMiddleware,
];
