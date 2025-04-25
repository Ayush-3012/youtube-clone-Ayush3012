import mongooose from "mongoose";

const channelSchema = mongooose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    owner: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    location: {
      type: String,
      default: "",
      required: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    channelBanner: {
      type: String,
      default: "",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    videos: [
      {
        type: mongooose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

export const Channel = mongooose.model("Channel", channelSchema);
