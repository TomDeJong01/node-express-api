import express from 'express';

const multer = require('multer');

import {getAllProducts, getProduct, updateProduct, addProduct, deleteProduct} from '../controllers/productController';
import {verifyToken} from "../middlewares/verifyAuth";
import {storage, fileFilter} from "../middlewares/storage";

const router = express.Router();
router.get("/:id", verifyToken, getProduct);
router.get("/", getAllProducts);

router.put("/updateProduct", verifyToken, updateProduct);

router.post("/addProduct", verifyToken, addProduct);
router.post("/uploadimage", verifyToken, multer({storage: storage, fileFilter: fileFilter }).single('image'), (res) => {res.send});

router.delete("/:id", verifyToken, deleteProduct)


export default router;
