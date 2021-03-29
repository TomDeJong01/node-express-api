import express from 'express';

import seedUser from '../controllers/seedUserController';
import {createAllTables} from "../db/dev/dbConnection";

const router = express.Router();

// seed user Route

// router.get('/seed/adduser', seedUser);
// router.get('/seed/createTables', createAllTables);

export default router;
