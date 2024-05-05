import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import path from 'path';

//Route Imports
import appointmentRoutes from './routes/appointment.Routes.js';
import authRoutes from './routes/auth.Routes.js';
import dataRoutes from './routes/data.Routes.js';
import storeRoutes from './routes/owner.Routes.js';
import userRoutes from './routes/user.Routes.js';

//dotenv config
dotenv.config();

// Server Setup and Routes
const port = 5000; // Sub Port

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

// Server Gateway Reponse
app.listen(process.env.PORT || port, () => {
  console.log(`API is now online on port: ${process.env.PORT || port}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/appointment', appointmentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
