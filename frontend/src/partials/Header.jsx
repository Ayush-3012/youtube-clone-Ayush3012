import Search from "../components/Search";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex space-x-4 items-center">
          {/* hamburger icon */}
          <div onClick={() => setShowSidebar(!showSidebar)}>
            <GiHamburgerMenu className="text-4xl cursor-pointer" />{" "}
          </div>

          {/* youtube logo */}
          <Link to={"/"} className="flex items-center gap-1 justify-center">
            <img src="/Youtube-logo.png" className="w-10 h-8 rounded-xl" />
            <span className="font-bold text-xl">YouTube</span>
          </Link>
        </div>

        {/* Search component */}
        <div>
          <Search />
        </div>

        {/* User profile */}
        <div className="text-4xl cursor-pointer">
          <FaRegUserCircle />
        </div>
      </div>
    </>
  );
};

export default Header;
