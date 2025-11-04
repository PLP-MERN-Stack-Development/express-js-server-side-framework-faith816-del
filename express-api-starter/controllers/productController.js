let products = [
  { id: 1, name: "Laptop", description: "High-performance laptop", price: 1200, category: "Electronics", inStock: true },
  { id: 2, name: "Phone", description: "Smartphone with great camera", price: 800, category: "Electronics", inStock: false },
];

import { NotFoundError } from "../utils/errors.js";

// Get all products
export const getProducts = (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  let filtered = products;
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page: pageNum,
    limit: limitNum,
    data: paginated,
  });
};

// Get product by ID
export const getProductById = (req, res, next) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
};

// ✅ Create product (moved logic back inside function)
export const createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res
      .status(400)
      .json({ message: "All fields (name, description, price, category, inStock) are required" });
  }

  const newProduct = {
    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    description,
    price,
    category,
    inStock,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Update product
export const updateProduct = (req, res, next) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return next(new NotFoundError("Product not found"));

  product.name = req.body.name || product.name;
  product.price = req.body.price !== undefined ? req.body.price : product.price;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.inStock = req.body.inStock !== undefined ? req.body.inStock : product.inStock;

  res.json(product);
};

// Delete product
export const deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return next(new NotFoundError("Product not found"));

  products.splice(index, 1);
  res.json({ message: "Product deleted" });
};

export const searchProducts = (req, res) => {
  const { name = "" } = req.query;
  const term = String(name).toLowerCase();
  const results = products.filter(p => p.name.toLowerCase().includes(term));
  res.json(results);
};

export const getProductStats = (req, res) => {
  const counts = products.reduce((acc, p) => {
    const key = p.category || "Uncategorized";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  res.json({ countsByCategory: counts, total: products.length });
};