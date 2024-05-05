import express from 'express';
import {
  getShop,
  ownerSetup,
  showAll,
  showFavouriteShops,
  showPendingOwners,
  showShop,
  updateApplication,
  viewActiveShop,
} from '../controllers/owner.Controller.js';
import { verifyAdmin, verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/setup/:id/:username', verifyToken, ownerSetup);

router.get('/shop/:id', verifyToken, showShop);

router.get('/active', viewActiveShop);

router.get('/pending', verifyToken, verifyAdmin, showPendingOwners);

router.get('/all', verifyToken, verifyAdmin, showAll);

router.post('/update/:id', verifyToken, verifyAdmin, updateApplication);

router.get('/details/:id', verifyToken, getShop);

router.get('/favourites', verifyToken, showFavouriteShops);

export default router;
