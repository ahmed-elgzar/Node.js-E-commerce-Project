import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID format"),
  validatorMiddleware,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name is too short")
    .isLength({ max: 32 })
    .withMessage("Brand name is too long"),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID format"),
  validatorMiddleware,
];

export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID format"),
  validatorMiddleware,
];
