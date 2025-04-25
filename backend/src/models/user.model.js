import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
