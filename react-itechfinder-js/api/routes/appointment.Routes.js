import express from 'express';
import {
  createAppointment,
  getAppointments,
  rateAppointment,
  readAppointment,
  updateAppointment,
} from '../controllers/appointment.Controller.js';
import { verifyToken } from '../utils/verify.js';

//Controller Import

const router = express.Router();

router.post('/create', verifyToken, createAppointment);

router.get('/view/:id/:type', verifyToken, getAppointments);

router.post('/update/:id', verifyToken, updateAppointment);

router.post('/read/:id/:userType', verifyToken, readAppointment);

router.post('/rate/:id/:shopId', verifyToken, rateAppointment);

export default router;
