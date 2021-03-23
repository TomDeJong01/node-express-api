import express from 'express';
var multer  = require('multer');

import {getAllProducts, getProduct, getCategories, updateProduct, addProduct} from '../controllers/productController';
import {verifyToken} from "../middlewares/verifyAuth";
import {storage, fileFilter} from "../middlewares/storage";

const router = express.Router();
router.get("/categories", getCategories);
router.get("/:id", getProduct);
router.get("/", getAllProducts);

router.put("/updateProduct", verifyToken, updateProduct);

router.post("/addProduct", verifyToken, addProduct);
router.post("/uploadimage", verifyToken, multer({storage : storage, fileFilter: fileFilter }).single('image'));


export default router;
