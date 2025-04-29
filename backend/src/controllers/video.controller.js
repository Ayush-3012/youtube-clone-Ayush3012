import Video from "../models/video.model.js";
import Channel from "../models/channel.model.js";

export const uploadVideo = async (req, res) => {
  const { title, thumbnailUrl, videoId, description, channelId } =
    req.body.videoData;
  try {
    // creating new video
    const newVideo = await Video.create({
      title,
      thumbnailUrl,
      videoId,
      description,
      channel: channelId,
      uploader: req.user.id,
    });

    // Add video to channel's videos list
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: newVideo._id },
    });

    return res
      .status(201)
      .json({ message: "Video Uploaded successfully", newVideo });
  } catch (error) {
    console.error("Upload video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllVideo = async (req, res) => {
  try {
    // finding all videos
    const foundVideos = await Video.find()
      .populate("channel", "channelName")
      .populate("uploader", ["username", "avatar"]);

    return res.status(200).json(foundVideos);
  } catch (error) {
    console.error("Get all videos error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getOneVideo = async (req, res) => {
  try {
    // finding video using id passed in params
    const foundVideo = await Video.findOne({ videoId: req.params.id })
      .populate("channel", ["channelName", "subscribers"])
      .populate("uploader", ["username", "avatar"])
      .populate({
        path: "comments",
        populate: { path: "user", select: "username avatar" },
      });
    if (!foundVideo)
      return res.status(404).json({ message: "Video not found" });
    return res.status(200).json(foundVideo);
  } catch (error) {
    console.error("Get video by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateVideo = async (req, res) => {
  try {
    // finding video using id passed in params
    const foundVideo = await Video.findById(req.params.id);
    if (!foundVideo)
      return res.status(404).json({ message: "Video not found" });

    // Only uploader can update the video details
    if (foundVideo.uploader.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to update" });
    }

    const updates = req.body;

    // updating the video using findByIdAndUpdate
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    return res.status(200).json({ message: "Video Updated", updatedVideo });
  } catch (error) {
    console.error("Update video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteVideo = async (req, res) => {
  try {
    // finding video using id passed in params
    const foundVideo = await Video.findById(req.params.id);

    if (!foundVideo)
      return res.status(404).json({ message: "Video not found" });

    // Only uploader can delete the video
    if (foundVideo.uploader.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to delete" });
    }

    // removing foundVideo from the video db.
    await foundVideo.deleteOne();

    // Removing the video id from channel's videos list
    await Channel.findByIdAndUpdate(foundVideo.channel, {
      $pull: { videos: foundVideo._id },
    });

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
