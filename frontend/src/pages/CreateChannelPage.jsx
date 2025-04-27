import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const CreateChannelPage = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const handleSubmit = () => {};
  return (
    <>
      <div className="border mt-4 w-full h-96 rounded-xl">
        <h2 className="text-2xl font-bold m-4">How you'll appear</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl flex flex-col items-center mx-auto space-y-2"
        >
          <div>
            <FaUserCircle className="h-36 w-36 text-blue-600 rounded-full" />
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full p-3 rounded-lg border  text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex gap-8 justify-end">
            <button
              type="submit"
              className="py-3 px-10 cursor-pointer bg-blue-600 hover:bg-blue-800 hover:scale-x-105 transition text-white font-bold rounded-lg shadow-md"
            >
              Create
            </button>
            <button className="px-10 py-3 cursor-pointer bg-white-600 hover:bg-slate-200 hover:scale-x-105 transition text-black font-bold rounded-lg shadow-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateChannelPage;
