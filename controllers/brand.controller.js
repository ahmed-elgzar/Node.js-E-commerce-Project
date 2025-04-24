import slugify from "slugify";
import asyncHandler from "express-async-handler";
import brandModel from "../models/brandModel.js";
import ApiError from "../utils/apiError.js";

/**
 *
 * @desc    Get list of brands
 * @route   GET /api/v1/brands
 * @access  Public
 */
export const getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: brands.length, page, data: brands });
});
/**
 *
 * @desc    Get specific brand by id
 * @route   GET /api/v1/brands/:id
 * @access  Public
 */
export const getbrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`Brand with id: ${id} Not found`, 404));
  }
  res.status(200).json({ data: brand });
});
/**
 *
 * @desc    Create Brand
 * @route   POST /api/v1/Brands
 * @access  Private
 */
export const createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

/**
 *
 * @desc    Update specific brand
 * @route   PUT /api/v1/brands/:id
 * @access  Private
 */
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ApiError(`Brand with id: ${id} Not found`, 404));
  }
  res.status(200).json({ data: brand });
});

/**
 *
 * @desc    Delete specific brand
 * @route   Delete /api/v1/brands/:id
 * @access  Private
 */
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ msg: `brand with id: ${id} deleted successfully` });
});
