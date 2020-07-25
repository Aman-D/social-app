const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const upload = require("../config/multer");
const verify = require("../middlewares/verify");
const { cloudinary_upload } = require("../config/cloudinary");

/**
 * @description New Post
 * @route /post/new POST
 */
router.post("/new", verify, async (req, res) => {
  // creating a new post
  try {
    var file_url = "";
    if (req.body.postImage) {
      file_url = await cloudinary_upload(req.body.postImage);
      file_url = file_url.url;
    }

    const post = new Post({
      description: req.body.description,
      postImage: file_url,
      postedBy: req.user,
    });
    await post.save();

    res.status(200).json({
      data: {
        type: "success",
        result: post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        type: "error",
        message: "Error in creating new Post",
      },
    });
  }
});

/**
 * @description Get all the posts
 * @route /post/all
 */
router.get("/all", verify, async (req, res) => {
  const posts = await Post.find({})
    .populate("postedBy", "_id username")
    .sort({ datePosted: -1 })
    .catch((err) => {
      return res.status(500).json({
        data: {
          type: "error",
          message: "Internal server error",
        },
      });
    });

  res.json({
    data: {
      type: "success",
      message: "All the post",
      posts,
    },
  });
});

/**
 * @description Get single post
 * @route /post/:id
 */
router.get("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json({
      data: {
        type: "success",
        result: post,
      },
    });
  } catch (error) {
    return res.status(500).json({
      data: {
        type: "error",
        error,
      },
    });
  }
});

module.exports = router;
