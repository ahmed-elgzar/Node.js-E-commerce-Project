import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";

/**
 *
 * @desc    Get list of categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
});
/**
 *
 * @desc    Get specific category by id
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `Category with id: ${id} Not found` });
  }
  res.status(200).json({ data: category });
});
/**
 *
 * @desc    Create Category
 * @route   POST /api/v1/categories
 * @access  Private
 */
export const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

/**
 *
 * @desc    Update specific category
 * @route   PUT /api/v1/categories/:id
 * @access  Private
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    res.status(404).json({ msg: `No Category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

/**
 *
 * @desc    Delete specific category
 * @route   Delete /api/v1/categories/:id
 * @access  Private
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: `No Category for this id ${id}` });
  }
  res.status(200).json({ msg: `category with id: ${id} deleted successfully` });
});
