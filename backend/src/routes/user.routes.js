import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserDetails,
  logout,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/getDetails/:userId").get(verifyToken, getUserDetails);
userRouter.route("/auth-status").get(verifyToken, (req, res) => {
  return res.status(200).json({ userId: req.user.id });
});

userRouter.route("/logout").post(verifyToken, logout);

export default userRouter;
