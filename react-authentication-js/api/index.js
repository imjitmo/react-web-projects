import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

//Route Imports
import authRoutes from './routes/auth.Routes.js';
import userRoutes from './routes/user.Routes.js';

//dotenv config
dotenv.config();

// Server Setup and Routes
const port = 5000; // Sub Port

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
