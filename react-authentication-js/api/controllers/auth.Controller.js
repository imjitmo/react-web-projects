import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';
import errorHandler from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new Users({ username, email, password: hashPassword });
    await newUser.save();
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

    //If user is registered, it will compare the password if the same
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    //Check if the password is the same
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    //Destructure password to remove it in the token
    const { password: hashedPassword, ...rest } = validUser._doc;

    //Creates an expiry date for the token
    const expiryDate = new Date(Date.now() + 36600000); //4 hours token

    //Creates token for accessing the page
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;

      const expiryDate = new Date(Date.now() + 36600000);
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
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
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashPassword, ...rest } = newUser._doc;

      const expiryDate = new Date(Date.now() + 36600000);
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout Success!');
};
