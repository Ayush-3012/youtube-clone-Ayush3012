/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllVideos, setVideoDetails } from "../redux/videoSlice";

export const useVideos = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllVideo = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_ROUTES}/videos/`);
      dispatch(setAllVideos(res?.data));
    };

    getAllVideo();
  }, []);

  const uploadVideo = async (videoData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/videos/`,
      { videoData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data?.message;
  };

  const getOneVideo = async (videoId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/videos/${videoId}`
    );

    dispatch(setVideoDetails(res?.data));
  };

  const updateVideo = async (vidId, updatedData) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}`,
      { updatedData },
      {
        headers: {
          Authorization: `Bearere ${token}`,
        },
      }
    );
    return res?.data?.message;
  };

  const deleteVideo = async (vidId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data?.message;
  };

  return { uploadVideo, getOneVideo, deleteVideo, updateVideo };
};
