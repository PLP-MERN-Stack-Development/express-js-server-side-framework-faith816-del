import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats,
} from '../controllers/productController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateProduct } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/search', searchProducts);
router.get('/stats', getProductStats);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, validateProduct, createProduct);
router.put('/:id', authMiddleware, validateProduct, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
