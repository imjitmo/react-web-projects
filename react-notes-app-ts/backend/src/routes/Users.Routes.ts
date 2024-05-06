import express from 'express';

import * as UsersController from '../controllers/Users.Controller';

const router = express.Router();

router.get('/', UsersController.getAuthenticatedUser);

router.post('/create', UsersController.signUp);

router.get('/login', UsersController.login);

router.post('/logout', UsersController.logout);

export default router;
