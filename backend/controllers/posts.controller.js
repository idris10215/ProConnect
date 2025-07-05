import Post from "../models/posts.model.js";
import User from "../models/user.model.js";

import bcrypt from "bcrypt";

export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "Running" });
};

export const createPost = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = new Post({
      userId: user._id,
      body: req.body.body,
      media: req.file != undefined ? req.file.filename : "",
      fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
    });

    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name username email profilePicture");
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deletePost = async (req, res) => {

    const {token, postId} = req.body;

    try {

        const user = await User.findOne( { token}).select("_id");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await Post.findOne({ _id: postId});

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own posts" });
        }

        await Post.deleteOne({ _id: postId });

        res.status(200).json({ message: "Post deleted successfully" });

        
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const commentPost = async (req, res) => {

    try {

        const { token, postId, comment } = req.body;

        const user = await User.findOne({ token }).select("_id  ");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        
        
    } catch (error) {
        console.error("Error commenting on post:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }

}