import express from 'express';
import { deleteUser, updateUser } from '../controllers/user.Controllers.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
