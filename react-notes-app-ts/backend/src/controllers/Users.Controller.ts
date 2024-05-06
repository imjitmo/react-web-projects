import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import User from '../models/User';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const authenticatedUserId = req.session.userId;

    if (!authenticatedUserId) throw createHttpError(401, 'User not authenticated');

    const user = await User.findById(authenticatedUserId).select('+email').exec();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  email?: string;
  username?: string;
  password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) throw createHttpError(400, 'All fields are required');

    const existingUsername = await User.findOne({ username }).exec();
    const existingEmail = await User.findOne({ email }).exec();
    if (existingUsername || existingEmail) throw createHttpError(409, 'User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, username, password: hashedPassword });

    req.session.userId = newUser._id;

    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) throw createHttpError(400, 'All fields are required');

    const user = await User.findOne({ username }).select('+password +email').exec();

    if (!user) throw createHttpError(401, 'Invalid credentials');

    const isPasswordCorrect = bcrypt.compareSync(password, user?.password!);

    if (!isPasswordCorrect) throw createHttpError(401, 'Invalid credentials');

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
