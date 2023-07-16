const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // unique ID generator
const fs = require("fs"); // filesystem module

// 2 functions to make code cleaner further
function readFile(path, callback) {
  fs.readFile(path, "utf8", callback);
}

function writeFile(path, data, callback) {
  fs.writeFile(path, JSON.stringify(data), callback);
}

//Send back the array of all videos
router.get("/", (req, res) => {
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(JSON.parse(data));
  });
  res.json;
});

// Get single video by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    const videos = JSON.parse(data);
    const videoFound = videos.find((video) => video.id == id);
    if (videoFound) {
      res.json(videoFound);
    } else {
      res.status(404).send(`no video with the id ${id} found`);
    }
  });
});

//Post new video to collection
router.post("/", (req, res) => {
  if (req.body.title && req.body.description) {
    res.json(req.body.video && req.body.description);
  } else {
    res.status(404).send("fill up the forms first");
  }
  readFile("./data/video-details.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    const videoData = JSON.parse(data); //parse JSON to convert to JS

    // push new video to dataVideos array
    videoData.push({
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      timestamp: Date.now(),
      channel: "Iaro library",
      image: "http://localhost:5050/images/image0.jpeg",
      views: "1",
      likes: "1",
      duration: "4:01",
      video: "https://project-2-api.herokuapp.com/stream",
      comments: [],
    });

    //write back to JSON file, save new video
    writeFile("./data/video-details.json", videoData, (err) => {
      if (err) {
        return res.status("error adding video");
      }
      res.status(201).send("video added");
    });
  });
});

module.exports = router;
