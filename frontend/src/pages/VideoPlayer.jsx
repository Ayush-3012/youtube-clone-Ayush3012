/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import Youtube from "react-youtube";
import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useVideos } from "../hooks/useVideos";
import { FaRegEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useComment } from "../hooks/useComment";
import { addComment, setComments } from "../redux/commentSlice";
import { setVideoId } from "../redux/videoSlice";
import { useHistory } from "../hooks/useHistory";
import { addToHistory } from "../redux/historySlice";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getOneVideo } = useVideos();
  const { saveHistory } = useHistory();
  const { userDetails } = useSelector((state) => state.auth);
  const { videoDetails, allVideos } = useSelector((state) => state.video);
  const comments = useSelector((state) => state.comment.comments);
  const { addAComment, getAllComments } = useComment();
  const vidId = localStorage.getItem("vidId");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      await getOneVideo(id);
    };

    const fetchComments = async () => {
      const res = await getAllComments(vidId);
      dispatch(setComments(res));
    };

    const saveWatchHistory = async () => {
      await saveHistory(vidId);
      dispatch(addToHistory(vidId));
    };
    fetchVideo();
    fetchComments();
    saveWatchHistory();
  }, [vidId, id]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const res = await addAComment(vidId, newComment);

    const formattedComment = {
      _id: res.newComment._id,
      text: res.newComment.text,
      timestamp: res.newComment.timestamp,
      createdAt: res.newComment.createdAt,
      updatedAt: res.newComment.updatedAt,
      user: {
        _id: res.newComment.user,
      },
      video: res.newComment.video,
    };

    dispatch(addComment(formattedComment));
    enqueueSnackbar(res.message, { variant: "success" });
    setNewComment("");
  };

  return (
    <>
      <div className="flex mt-4 mx-8 gap-8 w-full">
        {/* Left Main Player Section */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden">
            <Youtube videoId={id} opts={{ height: "610", width: "100%" }} />
          </div>

          {/* Video Title */}
          <h1 className="text-xl font-bold mt-4">{videoDetails?.title}</h1>

          {/* Channel Info and Subscribe */}
          <div className="flex justify-between items-center mt-4">
            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <img
                src={`${videoDetails?.uploader?.avatar}`}
                alt="channel-logo"
                className="rounded-full w-12 h-12"
              />
              <div>
                <h2 className="font-semibold">
                  {videoDetails?.channel?.channelName}
                </h2>
                <p className="text-sm text-gray-600">
                  {videoDetails?.channel?.subscribers}
                </p>
              </div>
            </div>

            {/* Subscribe Button */}
            <button className="bg-black text-white px-6 py-2 rounded-full hover:opacity-80">
              Subscribe
            </button>
          </div>

          {/* Views and Likes Section */}
          <div className="flex gap-6 mt-4 text-gray-600">
            <p className="flex gap-1 justify-center items-center">
              <FaRegEye /> {videoDetails?.views}
            </p>
            <p className="flex gap-1 justify-center items-center">
              <FaThumbsUp /> {videoDetails?.likes}
            </p>
            <p className="flex gap-1 justify-center items-center">
              <FaThumbsDown /> {videoDetails?.dislikes}
            </p>
          </div>

          {/* Video Description */}
          <div className="mt-4 p-4 text-lg bg-gray-100 rounded-lg">
            Description: {videoDetails?.description}
          </div>

          {/* Comments */}
          <div className="flex flex-col gap-2 mt-2">
            {/* Add a comment */}
            <div className="flex gap-4">
              <img
                src={`${userDetails?.avatar}`}
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="Add a comments..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border-b outline-none w-full pl-4"
              />
              <button
                onClick={handleAddComment}
                className="text-blue-500 cursor-pointer font-semibold hover:underline"
              >
                Comment
              </button>
            </div>

            {/* Posted Comments */}
            <div className="mt-4 flex flex-col gap-4">
              {comments?.length > 0 ? (
                comments?.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Recommendations */}
        <div className="w-full lg:w-80">
          <h2 className="font-bold text-lg mb-2 underline">
            Recommended Videos
          </h2>
          <div className="flex flex-col gap-2">
            {allVideos[0]?.slice(1)?.map((v) => (
              <div
                key={v.videoId}
                className="flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  dispatch(setVideoId(v._id));
                  localStorage.setItem("vidId", v._id);
                  navigate(`/video/${v.videoId}`);
                }}
              >
                <img
                  src={v.thumbnailUrl}
                  className="w-32 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">{v.title}</p>
                  <p className="text-xs text-gray-500">{v.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayerPage;
