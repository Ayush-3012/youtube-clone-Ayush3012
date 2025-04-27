import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`video/${video.videoId}`}
      className="cursor-pointer max-w-screen flex w-96 flex-col"
    >
      {/* Thumbnail */}
      <div>
        <img src={video.thumbnailUrl} className="h-56 p-1 rounded-xl" />
      </div>

      <div className="p-1 flex gap-2">
        {/* Channel Logo */}
        <div>
          <img
            src="https://yt3.ggpht.com/nVHFu4toQhlTic0QNJ1YBvpiQP74RHuwFNuQa6wog0b6TsukL9DVjiUeCAkp1fYyqkZnVpleem0=s68-c-k-c0x00ffffff-no-rj"
            className="rounded-full w-10"
          />
        </div>
        <div>
          {/* Title */}
          <div className="overflow-hidden font-bold">
            <p>{video.title}</p>
          </div>

          {/* Channel Name */}
          <div>HD Songs Bollywood</div>

          {/* Views */}
          <div>{video.views}</div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
