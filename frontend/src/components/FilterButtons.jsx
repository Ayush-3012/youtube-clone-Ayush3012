import filterOptions from "../utils/DummyFilterOptions";

const FilterButtons = () => {
  return (
    <div className="flex gap-2 my-2 items-center max-w-screen px-2">
      {filterOptions.map((option) => (
        <div
          key={option}
          className="bg-slate-200 py-1 px-3 rounded-xl hover:bg-slate-300 hover:scale-105 transition-transform duration-150 cursor-pointer inline-block"
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;
