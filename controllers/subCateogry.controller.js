import slugify from "slugify";
import asyncHandler from "express-async-handler";
import subCategoryModel from "../models/subCategoryModel.js";

import ApiError from "../utils/apiError.js";

/**
 *
 * @desc    Get list of subCategories
 * @route   GET /api/v1/subCategories
 * @access  Public
 */
export const getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await subCategoryModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ result: subCategories.length, page, data: subCategories });
});
/**
 *
 * @desc    Get specific sub category by id
 * @route   GET /api/v1/subCategories/:id
 * @access  Public
 */
export const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel
    .findById(id)
    .populate({ path: "category", select: "name -_id" });
  if (!subCategory) {
    return next(new ApiError(`Sub Category with id: ${id} Not found`, 404));
  }
  res.status(200).json({ data: subCategory });
});
/**
 *
 * @desc    Create subCategory
 * @route   POST /api/v1/subcategories
 * @access  Private
 */
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

/**
 *
 * @desc    Update specific subcategory
 * @route   PUT /api/v1/subcategories/:id
 * @access  Private
 */
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError(`Category with id: ${id} Not found`, 404));
  }
  res.status(200).json({ data: subCategory });
});

/**
 *
 * @desc    Delete specific subCategory
 * @route   Delete /api/v1/subcategories/:id
 * @access  Private
 */
export const deletesubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res
    .status(200)
    .json({ msg: `subCategory with id: ${id} deleted successfully` });
});
