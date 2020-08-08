const mongoose = require("mongoose");

const UserLikedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [
    {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
});

module.exports = mongoose.model("UserLikedPost", UserLikedPostSchema);
