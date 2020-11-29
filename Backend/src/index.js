const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const storySchema = new mongoose.Schema({
  name: String,
  story: [String],
});
mongoose
  .connect("mongodb://localhost/Thunderpot")
  .then(() => console.log("database connected"))
  .catch(() => {
    console.log("error in connecting database");
  });
const STORY = mongoose.model("stories", storySchema);

app.get("/", (req, res) => {
  STORY.find()
    .then((story) => res.send(story))
    .catch(() => console.log("no data found"));
});

app.post("/", (req, res) => {
  const newstory = new STORY(req.body);
  newstory
    .save()
    .then(() => {
      console.log("Saved Successfully");
      res.send(newstory);
    })
    .catch(() => {
      res.send("Not Saved");
    });
});

app.listen(3000, () => console.log("listening to port 3000"));
