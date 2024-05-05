//dependencies
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/connectDB.js';

import path from 'path';

//Route imports
import postRoutes from './routes/post.Routes.js';
import userRoutes from './routes/user.Routes.js';

//dotenv config
dotenv.config();

//db init
connectDB();

// path for directory promise routes
const __dirname = path.resolve();

//app initialization
const app = express();

app.use(express.urlencoded({ limit: '50mb', extended: true })); // Form Parser in the body
app.use(express.json({ limit: '50mb' })); // JSON parser for the body
app.use(cookieParser()); // get Cookie from req and set Cookie to res

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// for building on render with same directory
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
