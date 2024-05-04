import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const createPost = async (req, res) => {
  try {
    const { userId, content, picturePath } = req.body.values;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const newPost = new Post({
      user: userId,
      content,
      picturePath,
    });
    const newSavedPost = await newPost.save();
    const post = await Post.findById(newSavedPost._id).populate(
      "user",
      "firstName lastName picturePath"
    );
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "firstName lastName picturePath")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName lastName picturePath",
        },
      })
      .populate("likes", "firstName lastName picturePath");
    if (!posts) return res.status(404).json({ message: "No posts found" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const posts = await Post.find({ user: id })
      .populate("user", "firstName lastName picturePath")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName lastName picturePath",
        },
      })
      .populate("likes", "firstName lastName picturePath");
    if (!posts) return res.status(404).json({ message: "No posts found" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!post) return res.status(404).json({ message: "Post not found" });
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id === userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    const updatedPost = await Post.findById(postId)
      .populate("user", "firstName lastName picturePath")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName lastName picturePath",
        },
      })
      .populate("likes", "firstName lastName picturePath");
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, userId } = req.body;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!post) return res.status(404).json({ message: "Post not found" });
    const newComment = new Comment({
      content: comment,
      user: userId,
      post: postId,
    });
    await newComment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
