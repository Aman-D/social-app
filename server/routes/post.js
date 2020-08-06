const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const PostLike = require("../models/PostLike");

const upload = require("../config/multer");
const verify = require("../middlewares/verify");
const { cloudinary_upload } = require("../config/cloudinary");
const { mongo } = require("mongoose");

const _ = require("loadsh");
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

    var post = new Post({
      description: req.body.description,
      postImage: file_url,
      postedBy: req.user,
    });
    await post.save();

    // create a postLike schema for the given post
    var postLike = new PostLike({
      post: post._id,
    });
    postLike.save();

    post = await Post.findById(post._id).populate("postedBy");
    res.status(200).json({
      data: {
        type: "success",
        message: "Post created",
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
    .populate("postedBy", "_id username image")
    .sort({ _id: -1 })

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

/**
 * @description User likes a post
 * @route /post/like/:id
 */

router.post("/like/:id", verify, async (req, res) => {
  try {
    // check if the user already liked the post
    const alreadyLiked = await PostLike.findOne({ post: req.params.id }).select(
      "users"
    );

    let present = _.find(alreadyLiked.users, {
      user: mongo.ObjectId(req.user),
    });

    if (present) {
      await PostLike.updateOne(
        { post: req.params.id },
        { $pull: { users: { user: req.user } } },
        { upsert: true }
      );

      await Post.updateOne(
        { _id: mongo.ObjectId(req.params.id) },
        { $inc: { likes: -1 } }
      );
    } else {
      await PostLike.updateOne(
        { post: req.params.id },
        { $addToSet: { users: { user: req.user } } },
        { upsert: true }
      );

      await Post.updateOne(
        { _id: mongo.ObjectId(req.params.id) },
        { $inc: { likes: 1 } }
      );
    }

    res.status(200).json({
      data: {
        type: "success",
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        type: "error",
        message: "Serve error",
      },
    });
  }
});

module.exports = router;
