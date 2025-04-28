import { useSelector } from "react-redux";
import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../hooks/useVideos";

const HomePage = () => {
  useVideos();
  const allVideos = useSelector((state) => state?.video?.allVideos);

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Filter buttons */}
        <div className="overflow-x-auto whitespace-nowrap px-4 py-2">
          <FilterButtons />
        </div>

        {/* Videos Section */}
        <div className="grid px-4 py-4 grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {allVideos[0]?.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
