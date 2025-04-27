import { Link, useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { dummyVideos } from "../utils/DummyVideos";
import { useEffect, useState } from "react";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  const randomEnd = Math.floor(Math.random() * 10);

  useEffect(() => {
    const foundVid = dummyVideos.find((vid) => vid.videoId === id);
    setVideo(foundVid);
  }, [id]);

  return (
    <>
      <div className="flex mt-4 mx-8 gap-8 w-full">
        {/* Left Main Player Section */}
        <div className="flex-1">
          {/* Video iframe */}
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={video?.videoUrl}
              title="YouTube Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Video Title */}
          <h1 className="text-xl font-bold mt-4">{video?.title}</h1>

          {/* Channel Info and Subscribe */}
          <div className="flex justify-between items-center mt-4">
            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <img
                src="https://yt3.ggpht.com/nVHFu4toQhlTic0QNJ1YBvpiQP74RHuwFNuQa6wog0b6TsukL9DVjiUeCAkp1fYyqkZnVpleem0=s68-c-k-c0x00ffffff-no-rj"
                alt="channel-logo"
                className="rounded-full w-12 h-12"
              />
              <div>
                <h2 className="font-semibold">HD Songs Bollywood</h2>
                <p className="text-sm text-gray-600">1.2M subscribers</p>
              </div>
            </div>

            {/* Subscribe Button */}
            <button className="bg-black text-white px-6 py-2 rounded-full hover:opacity-80">
              Subscribe
            </button>
          </div>

          {/* Views and Likes Section */}
          <div className="flex gap-6 mt-4 text-gray-600">
            <p>{video?.views} views</p>
            <p>100 Likes</p> {/* Dummy static for now */}
            <p>5 Dislikes</p> {/* Dummy static for now */}
          </div>

          {/* Video Description */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            {video?.description}
          </div>

          {/* Comments */}
          <div className="flex flex-col gap-2">
            {/* Add a comment */}
            <div className="flex gap-4">
              <img src="/Youtube-logo.png" className="w-10 h-10 rounded-full" />
              <input
                type="text"
                placeholder="Add a comments..."
                className="border-b outline-none w-full pl-4"
              />
            </div>

            {/* Posted Comments */}
            <div>
              {video?.comments?.map((comment) => (
                <Comment key={comment.commentId} comment={comment} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Recommendations */}
        <div className="w-full lg:w-80">
          <h2 className="font-bold text-lg mb-2 underline">
            Recommended Videos
          </h2>
          <div className="flex flex-col gap-2">
            {dummyVideos.slice(1, randomEnd).map((v) => (
              <div
                key={v.videoId}
                className="flex gap-2 hover:bg-slate-200 p-2 rounded-md cursor-pointer"
                onClick={() => navigate(`/video/${v.videoId}`)}
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
