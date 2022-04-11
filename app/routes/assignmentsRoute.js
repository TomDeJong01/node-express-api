import express from 'express';

const multer = require('multer');

import {getAllAssignments} from '../controllers/assignmentsController';

const router = express.Router();

router.get("/get", getAllAssignments);




export default router;
