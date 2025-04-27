import { dummyVideos } from "../utils/DummyVideos";

const ChannelPage = () => {
  return (
    <div className="flex flex-col mt-2 mx-8">
      {/* Banner Image */}
      <div className="h-52 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* Channel Info Section */}
      <div className="flex mt-2 justify-between items-center p-4">
        {/* Channel profile image and info */}
        <div className="flex items-center gap-4">
          {/* Channel Picture, Name and Subscribers */}
          <img
            src="/Youtube-logo.png"
            alt="Channel"
            className="rounded-full w-24 h-24"
          />
          <div>
            <h2 className="text-2xl font-bold">HD Songs Bollywood</h2>
            <p className="text-gray-600">1.2M subscribers</p>
            <p className="text-gray-800">Welcome to official youtube channel</p>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="mt-4 sm:mt-0">
          <button className="bg-black cursor-pointer text-white py-2 px-6 rounded-full hover:opacity-80">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex gap-4 ml-12">
        <button className="text-xl">Home</button>
        <button className="text-xl">Videos</button>
        <button className="text-xl">Playlist</button>
        <button className="text-xl">About</button>
      </div>
      <hr />

      <div className="flex gap-4 ml-12 mt-6">
        <button className="bg-slate-200 cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-400 text-xl">
          Latest
        </button>
        <button className="bg-slate-200 cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-400 text-xl">
          Popular
        </button>
        <button className="bg-slate-200 cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-400 text-xl">
          Oldest
        </button>
      </div>
      {/* Videos Section */}
      <div className="p-4 grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {dummyVideos.map((video) => (
          <div key={video.videoId} className="cursor-pointer flex flex-col">
            {/* Thumbnail */}
            <img
              src={video.thumbnailUrl}
              className="rounded-xl h-56 object-cover"
              alt="thumbnail"
            />
            {/* Title */}
            <div className="mt-2 font-semibold">{video.title}</div>
            {/* Views */}
            <div className="text-gray-500 text-sm">{video.views} views</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
