require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const videoRoutes = require("./routes/videos");


app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const PORT = process.env.PORT || 5051;

//middleware body parser
app.use(express.json());

//middleware for public files
app.use(express.static('public'));


// routes for videos, get and post
app.use("/videos", videoRoutes);



//Start server on a set port number
app.listen(PORT, () => {
  console.log(`server started on port http://localhost:${PORT}`);
});
