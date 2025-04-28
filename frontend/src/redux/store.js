import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import channelReducer from "./channelSlice.js";
import videoReducer from "./videoSlice.js";
import commentReducer from "./commentSlice.js";
import historyReducer from "./historySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    video: videoReducer,
    comment: commentReducer,
    history: historyReducer,
  },
});
