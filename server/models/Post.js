const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
