import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./partials/Header";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Footer from "./partials/Footer";
import ChannelPage from "./pages/ChannelPage";
import VideoPlayer from "./pages/VideoPlayer";
import Sidebar from "./components/Sidebar";
import CreateChannelPage from "./pages/CreateChannelPage";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="mx-2 mt-4 ">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex">
        {showSidebar && (
          <div className="w-60 shrink-0">
            <Sidebar />
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/channel" element={<ChannelPage />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/create" element={<CreateChannelPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
