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
import UploadVideoPage from "./pages/UploadVideoPage";
import UpdateVideoPage from "./pages/UpdateVideoPage";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 m-2">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/channel" element={<ChannelPage />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/upload" element={<UploadVideoPage />} />
            <Route path="/updateVideo/:id" element={<UpdateVideoPage />} />
            <Route path="/create" element={<CreateChannelPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
