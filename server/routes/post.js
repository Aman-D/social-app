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
router.post("/new", verify, upload.single("postImage"), async (req, res) => {
  // creating a new post
  if (req.file) {
    try {
      const file_url = await cloudinary_upload(req.file.path); // get the file cloud url

      const post = new Post({
        description: req.body.description,
        postImage: file_url.url,
        postedBy: req.user._id,
      }); // create a new Post data
      await post.save(); // save the post
      return res.status(200).json({
        data: {
          type: "success",
          message: "Post uploaded",
        },
      });
    } catch (error) {
      return res.status(500).json({
        data: {
          type: "error",
          body: "Internal server error",
        },
      });
    }
  } else {
    try {
      const post = new Post({
        description: req.body.description,
        postedBy: req.user._id,
      }); // create a new Post data
      await post.save(); // save the post
      return res.status(200).json({
        data: {
          type: "success",
          message: "Post uploaded",
        },
      });
    } catch (error) {
      return res.status(500).json({
        data: {
          type: "error",
          body: "Internal server error",
        },
      });
    }
  }
  // let post;
  // if (!req.file) {
  //   post = new Post({
  //     description: req.body.description,
  //     postedBy: req.user._id,
  //   });
  // } else {
  //   let file_url;
  //   try {
  //     file_url = await cloudinary_upload(req.file.path);
  //   } catch (error) {
  //     console.log("error in uploading the file", error);
  //     return res.status(500).json({
  //       data: {
  //         type: "error",
  //         body: "Cannot upload the file",
  //       },
  //     });
  //   }
  //   console.log(file_url);
  //   post = new Post({
  //     description: req.body.description,
  //     postImage: req.file.filename,
  //     postedBy: req.user._id,
  //   });
  // }

  // await post.save().catch((err) => {
  //   console.log("Error in saving user" + err);
  //   return res.status(500).json({
  //     message: {
  //       type: "error",
  //       body: "Internal Server error. Please Try again Later",
  //     },
  //   });
  // });

  // return res.status(200).json({
  //   data: {
  //     type: "success",
  //     message: "Post uploaded",
  //   },
  // });
});

/**
 * @description Get all the posts
 * @route /post/all
 */
router.get("/all", verify, async (req, res) => {
  const posts = await Post.find({})
    .populate("postedBy", "_id username")
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
