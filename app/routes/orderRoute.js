import express from 'express';
import {getUserOrder, createOrder} from "../controllers/orderController";
import {verifyToken} from "../middlewares/verifyAuth";

const router = express.Router();
router.get('/:username', verifyToken, getUserOrder);

router.post('/:username', verifyToken, createOrder);
// router.post('/fill/:id', fillOrder);
// router.put('/order/:id', updateOrder);
// router.delete('/order/:id', deleteOrder);

export default router;
