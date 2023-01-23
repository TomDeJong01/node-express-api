import express from 'express';



import {getActiveCategories, getAllCategories, addCategory} from '../controllers/categoryController';
import {verifyToken} from "../middlewares/verifyAuth";

const router = express.Router();
router.get("/categories", getActiveCategories);
router.get("/allCategories", getAllCategories);

// router.put("/updateCategory", verifyToken, updateCategory);

router.post("/addCategory", verifyToken, addCategory);


// router.delete("/:id", verifyToken, deleteCategory)


export default router;
