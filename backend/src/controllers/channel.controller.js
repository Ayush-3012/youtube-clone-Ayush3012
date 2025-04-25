import { Channel } from "../models/channel.model.js";

export const createChannel = async (req, res) => {
  const { channelName, description, location, channelBanner } = req.body;
  try {
    // creating new channel with required details
    const newChannel = await Channel.create({
      channelName,
      owner: req.user.id,
      description,
      location,
      joinedAt: new Date(),
      channelBanner,
    });

    // Pushing the channel Id into User db, for the owner of the channel
    await User.findByIdAndUpdate(req.user.id, {
      $push: { channels: newChannel._id },
    });
    return res.status(201).json({ message: "Channel Created", newChannel });
  } catch (error) {
    console.error("Error in crateChannel:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const getChannelInfo = async (req, res) => {
  try {
    // searching for existnig channel using Id and populating the owner and videos fields with data from those db
    const existingChannel = await Channel.findById(req.params.id)
      .populate("owner", "username email avatar")
      .populate("videos");

    // Checking for existing channel if there is any.
    if (!existingChannel)
      return res.status(404).json({ message: "Channel not found" });

    return res.status(200).json(existingChannel);
  } catch (error) {
    console.error("Error in getChannelInfo:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const updateChannelInfo = async (req, res) => {
  try {
    const existingChannel = await Channel.findById(req.params.id);

    // Checking for existing channel if there is any.
    if (!existingChannel)
      return res.status(404).json({ message: "Channel not found" });

    // Checking for authorized user to do the action.
    if (existingChannel.owner.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized to update" });

    const updates = req.body;

    // updating the new info in the Channel db using findByIdAndUpdate
    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
      }
    );

    return res.statu(200).json(updatedChannel);
  } catch (error) {
    console.error("Error in updateChannelInfo:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const deleteChannel = async (req, res) => {
  try {
    const existingChannel = Channel.findById(req.params.id);

    // Checking for existing channel if there is any.
    if (!existingChannel)
      return res.status(404).json({ message: "Channel not found" });

    // Checking for authorized user to do the action.
    if (existingChannel.owner.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized to delete" });

    // removing the deleted channel from Channel db.
    await existingChannel.remove();

    // removing channel id from User db as well.
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { channels: existingChannel._id },
    });

    return res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChannelInfo:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
