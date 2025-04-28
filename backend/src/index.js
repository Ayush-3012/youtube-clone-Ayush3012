import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";

import app from "./app.js";
import Video from "./models/video.model.js";
import Channel from "./models/channel.model.js";

app.get("/", (req, res) => res.send("Hello, Welcome!"));

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server is listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MongoDb Connection failed: ", err));
