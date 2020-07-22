const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verify");
const User = require("../models/User");
const Post = require("../models/Post");

/**
 * @description User Profile
 * @route /user/profile
 */

router.get("/profile", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const posts = await Post.find({ postedBy: req.user }).sort({
      datePosted: 1,
    });
    res.json({
      data: {
        result: {
          user,
          posts,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        type: "error",
        message: "Internal server error",
      },
    });
  }
});

/**
 * @description View Other user profile, shows only latest 6 posts
 * @route /user/profile/view/:id
 */

router.get("/profile/view/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ postedBy: req.params.id })
      .sort({ datePosted: 1 })
      .limit(6);
    res.json({
      data: {
        result: {
          user,
          posts,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        type: "error",
        message: "Internal server error",
      },
    });
  }
});

module.exports = router;
