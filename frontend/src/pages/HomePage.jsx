import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";
import { dummyVideos } from "../utils/DummyVideos";

const HomePage = () => {
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
          {dummyVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
