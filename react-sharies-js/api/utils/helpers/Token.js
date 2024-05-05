// import jsonwebtoken
import jwt from 'jsonwebtoken';

// Model Import
import User from '../../models/user.Model.js';

const tokenCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: '15d',
  });
  res.cookie('token', token, {
    httpOnly: true, // not accessible by the browser
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'strict', // CSRF - VULNERABLE KEY
  });
  return token;
};

// Verify User via Cookies
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    //check if logged in
    if (!token) return res.status(401).json({ message: 'Unauthorized Action!' });

    //check if user is authenticated and same user as current user
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    //find the user
    const user = await User.findById(decoded.userId, { password: 0, __v: 0 });

    //fill the req.user info from user
    req.user = user;

    //go to next parameter once concluded
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log('Error in verifyToken', err.message);
  }
};

export { tokenCookies, verifyToken };
