import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import productModel from "../models/productModel.js";

/**
 *
 * @desc    Get list of products
 * @route   GET /api/v1/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await productModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: products.length, page, data: products });
});
/**
 *
 * @desc    Get specific product by id
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new ApiError(`product with id: ${id} Not found`, 404));
  }
  res.status(200).json({ data: product });
});
/**
 *
 * @desc    Create product
 * @route   POST /api/v1/products
 * @access  Private
 */
export const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

/**
 *
 * @desc    Update specific product
 * @route   PUT /api/v1/products/:id
 * @access  Private
 */
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`product with id: ${id} Not found`, 404));
  }
  res.status(200).json({ data: product });
});

/**
 *
 * @desc    Delete specific product
 * @route   Delete /api/v1/products/:id
 * @access  Private
 */
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ msg: `product with id: ${id} deleted successfully` });
});
