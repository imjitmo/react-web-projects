import { v2 as cloudinary } from 'cloudinary';

//import model
import Post from '../models/post.Model.js';
import User from '../models/user.Model.js';

// create post
const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;
    const currentId = req.user._id;

    if (!postedBy || !text) {
      return res.status(400).json({ error: 'text fields are required.' });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: 'user not found!' });
    }
    if (user._id.toString() !== currentId.toString()) {
      return res.status(401).json({ error: 'Unauthorized action!' });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({ error: `text must be less than ${maxLength} characters` });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: 'posts',
        width: 980,
        crop: 'scale',
      });
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();

    return res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in createPost', err.message);
  }
};

// get user  post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in getPost', err.message);
  }
};

// get user post
const userPost = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'user not found' });

    const post = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });
    return res.status(200).json(post);
  } catch (err) {
    console.log('Error in userPost', err.message);
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized Action' });
    }

    if (post.img) {
      const imgId = await post.img.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`posts/${imgId}`);
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'post deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in deletePost', err.message);
  }
};

// like/unlike post
const likePost = async (req, res) => {
  try {
    const currentId = req.user._id;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }

    const userLikedPost = post.likes.includes(currentId);
    if (userLikedPost) {
      //unlike post
      await Post.updateOne({ _id: req.params.id }, { $pull: { likes: currentId } });
      return res.status(200).json({ message: 'post unliked successfully!' });
    } else {
      //like post
      post.likes.push(currentId);
      await post.save();
      return res.status(200).json({ message: 'post liked successfully!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in likePost', err.message);
  }
};

// reply to post
const replyPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    if (!text) {
      return res.status(400).json({ error: 'text field is required' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();

    return res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in replyPost', err.message);
  }
};

// get all post
const feedPost = async (req, res) => {
  try {
    const currentId = req.user._id;
    const user = await User.findById(currentId);

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const following = user.following;

    const feedPost = await Post.find({ postedBy: { $in: following } }, { __v: 0 }).sort({ createdAt: -1 }); // sort post in descending order

    return res.status(200).json(feedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('Error in feedPost', err.message);
  }
};

export { createPost, deletePost, feedPost, getPost, likePost, replyPost, userPost };
