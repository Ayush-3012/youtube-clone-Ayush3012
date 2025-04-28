import axios from "axios";

export const useHistory = () => {
  const token = localStorage.getItem("token");

  const saveHistory = async (videoId) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/users/history/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  return { saveHistory };
};
