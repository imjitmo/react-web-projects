import express from 'express';

//controller import
import {
  followUser,
  getUserProfile,
  signinUser,
  signoutUser,
  signupUser,
  updateUser,
} from '../controllers/user.Controller.js';

// Token Authentication
import { verifyToken } from '../utils/helpers/Token.js';

const router = express.Router();

// get profile
router.get('/profile/:username', getUserProfile);

//sign up api
router.post('/signup', signupUser);

//sign in api
router.post('/signin', signinUser);

//sign out api
router.post('/signout', signoutUser);

//follow api
router.post('/follow/:id', verifyToken, followUser);

//update profile api
router.put('/update/:id', verifyToken, updateUser);

export default router;
