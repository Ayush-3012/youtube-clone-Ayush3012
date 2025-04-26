import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";

export const addAComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = Comment.create({
      user: req.user.id,
      video: req.params.id,
      text,
    });

    await Video.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment._id },
    });

    return res.statu(201).json({ message: "Comment Added", newComment });
  } catch (error) {
    console.error("Error while adding comment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.id })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 }); // Newest comments first

    return res.status(200).json(commentscomments);
  } catch (error) {
    console.error("Error whle getting all comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const foundComment = await Comment.findById(req.params.id);

    if (!foundComment)
      return res.status(404).json({ message: "Comment not found" });

    if (foundComment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update comment" });
    }

    foundComment.text = text;
    await foundComment.save();

    return res.status(200).json(foundComment);
  } catch (error) {
    console.error("Error whle getting all comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const foundComment = await Comment.findById(req.params.id);

    if (!foundComment)
      return res.status(404).json({ message: "Comment not found" });

    if (foundComment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await foundComment.remove();

    // Remove comment from video.comments array
    await Video.findByIdAndUpdate(foundComment.video, {
      $pull: { comments: foundComment._id },
    });

    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
