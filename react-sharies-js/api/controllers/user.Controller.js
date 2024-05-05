import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import User from '../models/user.Model.js';
import { tokenCookies } from '../utils/helpers/Token.js';

//get user profile
const getUserProfile = async (req, res) => {
  const query = req.params.username;
  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query }, { password: 0, updatedAt: 0 });
    } else {
      user = await User.findOne({ username: query }, { password: 0, updatedAt: 0 });
    }
    if (!user) return res.status(400).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('error in getUserProfile', err.message);
  }
};

// user signup
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // if email and username exists
    if (user) return res.status(400).json({ error: 'User already exists' });

    //if not
    const salt = await bcrypt.genSalt(10); // creating salt
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    //creating user
    await newUser.save();

    if (newUser) {
      // generate token cookie
      tokenCookies(newUser._id, res);
      const { password: pass, ...rest } = newUser._doc;
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      return res.status(400).json({ error: 'something went wrong!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('error in signupUser', err.message);
  }
};

// user signin
const signinUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

    if (!user || !isPasswordCorrect) return res.status(400).json({ error: 'Invalid username or password' });

    // generate token cookie
    tokenCookies(user._id, res);

    const { password: pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in signinUser: ', err.message);
  }
};

//signout user
const signoutUser = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ message: 'user logged out successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log('Error in signoutUser: ', err.message);
  }
};

//Follow/Unfollow User
const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentId = req.user._id;
    const userMod = await User.findById(id);
    const { password: pass, ...restUser } = userMod._doc;

    const currentUser = await User.findById(currentId);
    const { password: currentPass, ...restCurrent } = currentUser._doc;

    if (id === currentId.toString())
      return res.status(400).json({ error: 'You cannot follow/unfollow yourself' });

    if (!restUser || !restCurrent) return res.status(404).json({ error: 'User not found' });

    const isFollowing = currentUser.following.includes(id);

    // Check if the user will be followed or unfollowed
    if (isFollowing) {
      await User.findByIdAndUpdate(currentId, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: currentId } });
      return res.status(201).json({ message: 'unfollowed successfully' });
    } else {
      await User.findByIdAndUpdate(currentId, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: currentId } });
      return res.status(201).json({ message: 'followed successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in followUser: ', err.message);
  }
};

//update user profile
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'user not found' });
    if (req.params.id !== userId.toString())
      return res.status(400).json({ message: "you cannot update other user's profile" });
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashPassword(password, salt);
      user.password = hashedPassword;
    }
    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(`avatars/${user.profilePic.split('/').pop().split('.')[0]}`);
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
        folder: 'avatars',
        width: 420,
        crop: 'scale',
      });
      profilePic = uploadedResponse.secure_url;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in updateUser: ', err.message);
  }
};

export { followUser, getUserProfile, signinUser, signoutUser, signupUser, updateUser };
