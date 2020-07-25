const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verify");
const User = require("../models/User");
const Post = require("../models/Post");
const { cloudinary_upload } = require("../config/cloudinary");
var _ = require("lodash");
/**
 * @description User Profile
 * @route /user/profile
 */

router.get("/profile", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const posts = await Post.find({ postedBy: req.user })
      .populate("postedBy")
      .sort({
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

/**
 * @description Updates the user profile
 * @route /user/profile/update
 */
router.post("/profile/update", verify, async (req, res) => {
  try {
    const { _id, username, email, image, bio } = req.body;
    var urlIncludes = _.includes(image, "res.cloudinary.com");
    console.log(urlIncludes);
    var file_url = image;
    if (!urlIncludes && image != "") {
      file_url = await cloudinary_upload(image); // get the file cloud url
      file_url = file_url.url;
    }
    User.findOneAndUpdate(
      { _id: _id },
      { username, email, image: file_url, bio },
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            data: {
              type: "error",
              message: "Internal server error",
            },
          });
        } else {
          const user = await User.findById(_id);
          res.status(200).json({
            data: {
              type: "success",
              user,
            },
          });
        }
      }
    );
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

module.exports = router;
