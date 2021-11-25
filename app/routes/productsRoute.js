import express from 'express';

const multer = require('multer');

import {getAllProducts, getProduct, getActiveCategories, getAllCategories, updateProduct, addProduct, deleteProduct} from '../controllers/productController';
import {verifyToken} from "../middlewares/verifyAuth";
import {storage, fileFilter} from "../middlewares/storage";

const router = express.Router();
router.get("/categories", getActiveCategories);
router.get("/allCategories", getAllCategories);
router.get("/:id", verifyToken, getProduct);
router.get("/", getAllProducts);

router.put("/updateProduct", verifyToken, updateProduct);

router.post("/addProduct", verifyToken, addProduct);
router.post("/uploadimage", verifyToken, multer({storage : storage, fileFilter: fileFilter }).single('image'));

router.delete("/:id", verifyToken, deleteProduct)


export default router;
