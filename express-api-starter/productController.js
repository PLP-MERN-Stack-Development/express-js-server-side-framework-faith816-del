import { v4 as uuidv4 } from "uuid";

// Temporary in-memory "database"
let products = [
  { id: uuidv4(), name: "Laptop", price: 1200 },
  { id: uuidv4(), name: "Phone", price: 800 },
  { id: uuidv4(), name: "Headphones", price: 150 },
];

// GET all products
export const getAllProducts = (req, res) => {
  res.json(products);
};

// GET product by ID
export const getProductById = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// CREATE new product
export const createProduct = (req, res) => {
  const { name, price } = req.body;
  if (!name || !price)
    return res.status(400).json({ message: "Name and price are required" });

  const newProduct = { id: uuidv4(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// UPDATE product
export const updateProduct = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;

  res.json(product);
};

// DELETE product
export const deleteProduct = (req, res) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1)
    return res.status(404).json({ message: "Product not found" });

  products.splice(productIndex, 1);
  res.json({ message: "Product deleted successfully" });
};