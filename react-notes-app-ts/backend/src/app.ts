import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import notesRouter from './routes/Notes.Routes';
import userRouter from './routes/Users.Routes';
import env from './utils/validateEnv';

import MongoStore from 'connect-mongo';
import session from 'express-session';
import createHttpError, { isHttpError } from 'http-errors';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
    }),
  })
);

app.use('/api/notes', notesRouter);
app.use('/api/users', userRouter);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint Not Found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
