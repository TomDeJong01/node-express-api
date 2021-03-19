import express from 'express';

import { createAdmin, updateUserToAdmin } from '../controllers/adminController';
import {verifyToken} from "../middlewares/verifyAuth";

const router = express.Router();

// users Routes

router.post('/admin/signup', verifyToken, createAdmin);
router.put('/user/:id/admin', verifyToken, updateUserToAdmin);

export default router;
