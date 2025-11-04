import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET a single product by ID
router.get("/:id", getProductById);

// POST a new product
router.post("/", createProduct);

// PUT (update) an existing product
router.put("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

export default router;