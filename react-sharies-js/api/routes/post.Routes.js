import express from 'express';

//controller import
import {
  createPost,
  deletePost,
  feedPost,
  getPost,
  likePost,
  replyPost,
  userPost,
} from '../controllers/post.Controller.js';

// Token Authentication
import { verifyToken } from '../utils/helpers/Token.js';

const router = express.Router();

//get all post
router.get('/feed', verifyToken, feedPost);

//get all user post
router.get('/user/:username', verifyToken, userPost);

//get post
router.get('/:postId', verifyToken, getPost);

// create post
router.post('/create', verifyToken, createPost);

//delete post
router.delete('/:id', verifyToken, deletePost);

//like/unlike post
router.put('/like/:id', verifyToken, likePost);

//reply to post
router.put('/reply/:id', verifyToken, replyPost);

export default router;
