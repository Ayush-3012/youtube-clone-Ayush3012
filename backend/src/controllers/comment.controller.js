import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";

export const addAComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = Comment.create({
      user: req.user.id,
      video: req.params.id,
      text,
      timestamp: new Date.now(),
    });

    return res.statu(201).json({ message: "Comment Added", newComment });
  } catch (error) {
    console.error("Error while adding comment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getAllComments = async (req, res) => {
  try {
    const foundVideo = Video.findById(req.params.id);
    if (!foundVideo) return res.statu(404).json({ message: "Video not found" });

    return res.status(200).json(foundVideo.comments);
  } catch (error) {
    console.error("Error whle getting all comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const foundVideo = Video.findById(req.params.id);

    if (!foundVideo)
      return res.status(404).json({ message: "Video not found" });
  } catch (error) {
    console.error("Error whle getting all comments:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deleteComment = async (req, res) => {};
