import express from 'express';
import {getUserOrder, createOrder} from "../controllers/orderController";

const router = express.Router();
router.get('/:username', getUserOrder);

router.post('/:username', createOrder);
// router.post('/fill/:id', fillOrder);
// router.put('/order/:id', updateOrder);
// router.delete('/order/:id', deleteOrder);

export default router;
