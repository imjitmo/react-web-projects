import express from 'express';
import { getData, newData, updateData } from '../controllers/data.Controller.js';
import { verifyAdmin, verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/new/:id&:username', verifyToken, newData);

router.get('/details/:id&:username', verifyToken, getData);

router.post('/update/:id', verifyToken, updateData);

export default router;
