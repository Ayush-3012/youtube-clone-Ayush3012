import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdHistory,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineLike } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-44 bg-white p-4 flex flex-col space-y-6 shadow-md h-screen">
      {/* Home */}
      <Link
        to={"/"}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <MdHomeFilled className="text-2xl" />
        <span className="text-md font-semibold">Home</span>
      </Link>

      {/* Shorts */}
      <Link className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
        <SiYoutubeshorts className="text-2xl" />
        <span className="text-md font-semibold">Shorts</span>
      </Link>

      {/* Subscriptions */}
      <Link className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
        <MdOutlineSubscriptions className="text-2xl" />
        <span className="text-md font-semibold">Subscriptions</span>
      </Link>

      <hr className="border-gray-300" />

      {/* Your Videos */}
      <Link
        to={"/channel"}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <FaUserCircle className="text-2xl" />
        <span className="text-md font-semibold">Your Videos</span>
      </Link>

      {/* History */}
      <Link className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
        <MdHistory className="text-2xl" />
        <span className="text-md font-semibold">History</span>
      </Link>

      {/* Liked Videos */}
      <Link className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
        <AiOutlineLike className="text-2xl" />
        <span className="text-md font-semibold">Liked Videos</span>
      </Link>
    </div>
  );
};

export default Sidebar;
