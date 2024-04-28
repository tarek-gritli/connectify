import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(
      "friends",
      "firstName lastName picturePath location occupation"
    );
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await Post.findById(friendId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!friend) return res.status(404).json({ message: "Friend not found" });
    //add friend to user's friends list
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).populate("friends", "firstName lastName picturePath location occupation");
    //add user to friend's friends list
    await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: id } },
      { new: true }
    );
    res.status(200).json(updatedUser.friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await Post.findById(friendId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!friend) return res.status(404).json({ message: "Friend not found" });
    //remove friend from user's friends list
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { friends: friendId } },
      { new: true }
    ).populate("friends", "firstName lastName picturePath occupation location");
    //remove user from friend's friends list
    await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: id } },
      { new: true }
    );
    res.status(200).json(updatedUser.friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    //delete all posts by this user
    await Post.deleteMany({ user: id });
    //delete the user's comments
    await Comment.deleteMany({ userId: id });
    //remove user from friends' friends list
    user.friends.forEach(async (friendId) => {
      await User.findByIdAndUpdate(
        friendId,
        { $pull: { friends: id } },
        { new: true }
      );
    });
    // remove user's likes from posts
    const posts = await Post.find();
    posts.forEach(async (post) => {
      if (post.likes.includes(id)) {
        await Post.findByIdAndUpdate(
          post._id,
          { $pull: { likes: id } },
          { new: true }
        );
      }
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
