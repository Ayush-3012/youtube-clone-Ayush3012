import { useDispatch } from "react-redux";
import { setUserInfo, logoutUser, setUserDetails } from "../redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setChannelId } from "../redux/channelSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const savedChannelId = localStorage.getItem("channelId");
    const checkStatus = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ROUTES}/users/auth-status`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      savedChannelId && dispatch(setChannelId(savedChannelId));
      dispatch(setUserInfo(res?.data?.userId));
    };
    checkStatus();
  }, [dispatch, token]);

  const login = async (email, password) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/users/login`,
      { email, password }
    );
    localStorage.setItem("token", res?.data?.token);
    dispatch(setUserInfo(res?.data?.foundUser?._id));

    const channelId = res?.data?.foundUser?.channels[0];
    dispatch(setChannelId(channelId));
    localStorage.setItem("channelId", channelId);
    navigate("/");
  };

  const register = async (username, email, password, avatar) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/users/register`,
      {
        username,
        email,
        password,
        avatar,
      }
    );
    localStorage.setItem("token", res?.data?.token);
    dispatch(setUserInfo(res?.data?.userId));
  };

  const getUserDetails = async (userId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/users/getDetails/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(setUserDetails(res?.data?.foundUser));
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("channelId");
    dispatch(setChannelId(null));
    dispatch(logoutUser());
    return res?.data?.message;
  };

  return { login, register, logout, getUserDetails };
};
