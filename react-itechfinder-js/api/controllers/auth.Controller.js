import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import Users from '../models/Users.js';
import verifyEmail from '../utils/email.js';
import errorHandler from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password, userType } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);

  try {
    const checkUsername = await Users.findOne({ username });
    const checkEmail = await Users.findOne({ email });
    if (checkUsername) {
      res.status(500).json({ success: false, message: 'username already exists' });
      return;
    }
    if (checkEmail) {
      res.status(500).json({ success: false, message: 'email already exists' });
      return;
    }
    const newUser = new Users({ username, email, password: hashPassword, userType });
    await newUser.save();

    const token = new Token({ userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
    await token.save();

    const link = `https://itechfinder.onrender.com/verify/${token.token}`;

    await verifyEmail(email, link);
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Users.findOne({ email });

    //Check if user is already registered
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    //Check if user is verified
    if (!validUser.isVerified) return next(errorHandler(401, 'Please verify your email to continue!'));

    //Check if user is active/inactive
    if (!validUser.isActive)
      return next(errorHandler(401, 'Your account is currently blocked by the administrator!'));

    //If user is registered, it will compare the password if the same
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    //Check if the password is the same
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    //Destructure password to remove it in the token
    const { password: hashedPassword, ...rest } = validUser._doc;

    //Creates token for accessing the page
    const token = jwt.sign(
      {
        id: validUser._id,
        isActive: validUser.isActive,
        isAdmin: validUser.isAdmin,
        adminLevel: validUser.adminLevel,
        userType: validUser.userType,
        isOwner: validUser.isOwner,
      },
      process.env.JWT_SECRET
    );
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          isActive: user.isActive,
          isAdmin: user.isAdmin,
          adminLevel: user.adminLevel,
          userType: user.userType,
          isOwner: user.isOwner,
        },
        process.env.JWT_SECRET
      );
      const { password: hashedPassword, ...rest } = user._doc;

      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatedPassword =
        (await Math.random().toString(36).slice(-8)) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username =
        (await req.body.name.split(' ').join('').toLowerCase()) +
        Math.floor(Math.random() * 10000).toString();
      const newUser = new Users({
        username: username,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
        isVerified: true,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          id: newUser._id,
          isActive: newUser.isActive,
          isAdmin: newUser.isAdmin,
          adminLevel: newUser.adminLevel,
          userType: newUser.userType,
          isOwner: newUser.isOwner,
        },
        process.env.JWT_SECRET
      );
      const { password: hashPassword, ...rest } = newUser._doc;

      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout Success!');
};

export const verifyAccount = async (req, res, next) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });
    if (token) {
      await Users.updateOne({ _id: token.userId }, { $set: { isVerified: true } });
      await Token.findByIdAndDelete(token._id);
      return res
        .status(200)
        .json({ state: true, message: 'Verification Successful! You may not log on to your account' });
    } else {
      return res.status(404).json({ state: false, message: 'Invalid Token! Please try again!' });
    }
  } catch (error) {
    next(error);
  }
};
