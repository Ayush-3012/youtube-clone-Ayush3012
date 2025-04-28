/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useDispatch} from "react-redux";
import { setChannelDetails } from "../redux/channelSlice";
import { useEffect } from "react";

export const useChannel = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const savedChannelId = localStorage.getItem("channelId");

  useEffect(() => {
    const fetchMyChannelDetails = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ROUTES}/channels/${savedChannelId}`
      );

      dispatch(setChannelDetails(res?.data));
    };

    fetchMyChannelDetails();
  }, []);

  const createChannel = async (channelData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/channels/`,
      { channelData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setChannelDetails(res?.data?.newChannel));
    return res?.data?.message;
  };

  const getChannelInfo = async (channelId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/channels/${channelId}`
    );

    dispatch(setChannelDetails(res?.data));
  };

  const updateChannelInfo = async (channelId, updatedData) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_ROUTES}/channels/${channelId}`,
      { updatedData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  };

  const deleteChannel = async (channelId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ROUTES}/channels/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.message;
  };

  return { createChannel, getChannelInfo, updateChannelInfo, deleteChannel };
};
