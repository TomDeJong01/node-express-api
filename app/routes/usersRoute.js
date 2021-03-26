import express from 'express';

import { createUser, loginUser, searchFirstnameOrLastname, userTest, validateToken } from '../controllers/usersController';

const router = express.Router();

// users Routes
router.post('/auth/signup', createUser);
router.post('/auth/signin', loginUser);
router.get('/auth/validatetoken', validateToken);


export default router;
