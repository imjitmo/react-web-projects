import express from 'express';
import {
  checkEmail,
  checkUser,
  deleteUser,
  followUnfollowStore,
  getUsers,
  updateUser,
  updateUserLevel,
} from '../controllers/user.Controller.js';
import { verifyAdmin, verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);

router.delete('/delete/:id', verifyToken, deleteUser);

router.post('/validateUsername/:id/:username', verifyToken, checkUser);

router.post('/validateEmail/:id/:email', verifyToken, checkEmail);

router.get('/userLists', verifyToken, verifyAdmin, getUsers);

router.post('/follow/:id', verifyToken, followUnfollowStore);

router.post('/status/:id', verifyToken, verifyAdmin, updateUserLevel);

export default router;
