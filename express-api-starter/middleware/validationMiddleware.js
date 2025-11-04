import { ValidationError } from "../utils/errors.js";

export const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return next(new ValidationError('All fields (name, description, price, category, inStock) are required'));
  }
  if (typeof price !== 'number' || price < 0) {
    return next(new ValidationError('Price must be a non-negative number'));
  }
  if (typeof inStock !== 'boolean') {
    return next(new ValidationError('inStock must be a boolean'));
  }
  next();
};
