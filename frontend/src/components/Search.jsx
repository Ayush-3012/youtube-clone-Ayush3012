import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../redux/videoSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { searchInput } = useSelector((state) => state.video);

  return (
    <>
      <div className="flex items-center border rounded-full">
        <input
          type="text"
          className=" w-2xl px-4 rounded-full rounded-r-none outline-none py-2"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => dispatch(setSearchInput(e.target.value))}
        />
        <button className="bg-slate-200 rounded-full rounded-l-none hover:bg-slate-300 cursor-pointer text-2xl py-2 px-4">
          <IoSearchSharp />
        </button>
      </div>
    </>
  );
};

export default Search;
