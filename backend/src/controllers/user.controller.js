import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokens from "../utils/generateTokens.js";

export const registerUser = async (req, res) => {
  const { userName, email, password, avatar } = req.body;

  try {
    const foundUser = User.findOne({ email });
    if (foundUser)
      return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      avatar,
    });

    return res
      .json(201)
      .json({ _id: newUser._id, token: generateTokens(newUser._id) });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = User.findOne({ email });
    if (!foundUser)
      return res
        .status(400)
        .json({ message: "Either username or password is invalid" });

    const passwordMatched = await User.validatePassword(password);
    if (!passwordMatched)
      return res
        .status(400)
        .json({ message: "Either username or password is invalid" });

    res.json({
      _id: foundUser._id,
      token: generateTokens(foundUser._id),
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
