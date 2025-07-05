import Comment from "../models/comments.model.js";
import Post from "../models/posts.model.js";
import User from "../models/user.model.js";


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

export const add_comment_to_post = async (req, res) => {
    const { token, postId, body } = req.body;

    try {

        const user = await User.findOne({ token }).select("_id");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = new Comment({
            userId: user._id,
            postId: post._id,
            body
        });

        await comment.save();

        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({ message: "Comment added successfully", comment });
        
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
};


export const get_comments_by_post = async (req, res) => {
    const { postId } = req.body;

    try {

        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ comments: post.comments });
        
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }

}

export const delete_comment_of_user = async (req, res) => {

    try {

        const { token, commentId} = req.body;

        const user = await User.findOne({ token }).select("_id");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const comment = await Comment.findOne({ _id: commentId });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own comments" });
        }
        await Comment.deleteOne({ _id: commentId });

        return res.status(200).json({ message: "Comment deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }

}


export const increment_likes = async (req, res) => {

    const { postId} = req.body;

    try {
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        post.likes += 1;
        await post.save();
        return res.status(200).json({ message: "Post liked successfully", likes: post.likes });
    } catch (error) {
        console.error("Error liking post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
