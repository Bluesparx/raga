import Post from '../models/PostModel.js';
import User from '../models/UserModel.js';

export const createPost = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      tags,
      user: req.user.id, 
    });

    const savedPost = await newPost.save();

    const user = await User.findById(req.user.id);
    user.posts.push(savedPost._id); 
    await user.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.remove();

    const user = await User.findById(req.user.id);
    user.posts = user.posts.filter(p => p.toString() !== req.params.id);
    await user.save();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username'); 
    const postsWithLikes = posts.map(post => ({
      ...post._doc,
      likesCount: post.likes.length, 
    }));
    res.status(200).json(postsWithLikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);  
    const user = await User.findById(req.user.id);

    if(post.likes.includes(user)){
      post.likes = post.likes.filter(id => id.toString() !== userId)
      await post.save();
      return res.status(200).json({ message: "Post unliked", post });
    } else {
      post.likes.push(user);
      await post.save();
      return res.status(200).json({ message: "Post unliked", post });
    }

  } catch (error) {
    res.statud(500).json({ message: error.message });
  }
}