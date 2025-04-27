import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <>
      <div className="flex items-center border rounded-full">
        <input
          type="text"
          className=" w-2xl px-2 rounded-full rounded-r-none outline-none py-2"
          placeholder="Search"
        />
        <button className="bg-slate-200 rounded-full rounded-l-none hover:bg-slate-300 cursor-pointer text-2xl py-2 px-4">
          <IoSearchSharp />
        </button>
      </div>
    </>
  );
};

export default Search;
