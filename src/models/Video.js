import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true, maxLength: 80 },
  description: { type: String, trim: true, required: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now }, //required 필수요소로 설정
  hashtags: [{ type: String, trim: true }],
  metaL: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
}); // import 따로 안해줘도된다. static으로 함수를 만들어줘라

// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
//   // this.title = "HaHaha! im a middleware!!!!!";
// });

const Video = mongoose.model("Video", videoSchema);
export default Video;

// import Video from "....."
