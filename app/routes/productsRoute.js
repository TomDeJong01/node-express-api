import express from 'express';

import {getAllProducts, getProduct, getCategories} from '../controllers/productController';

const router = express.Router();
router.get("/categories", getCategories);
router.get("/:id", getProduct);
router.get("/", getAllProducts);

export default router;
