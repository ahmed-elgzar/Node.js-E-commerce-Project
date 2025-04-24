import express from "express";
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator.js";
import {
  createBrand,
  deleteBrand,
  getbrand,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getbrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
