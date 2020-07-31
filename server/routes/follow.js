const verify = require("../middlewares/verify");
const express = require("express");
const router = express.Router();
const Followers = require("../models/Follower");
const Following = require("../models/Following");
var mongodb = require("mongodb");
const mongoose = require("mongoose");

/**
 * @description Follow a user
 * @description /user/friend/follow
 */

router.post("/follow", verify, async (req, res) => {
  const { user } = req.body;
  try {
    await Following.updateOne(
      { user: req.user },
      { $addToSet: { following: user } },
      { upsert: true }
    );

    await Followers.updateOne(
      { user: user },
      { $addToSet: { followers: req.user } },
      { upsert: true }
    );

    res.status(200).json({
      data: {
        type: "success",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        type: "error",
        message: "No users found",
      },
    });
  }
});

/**
 * @description Follow a user
 * @description /user/friend/unfollow
 */

router.post("/unfollow", verify, async (req, res) => {
  const { user } = req.body;
  try {
    await Following.updateOne(
      { user: req.user },
      { $pull: { following: user } }
    );
    await Followers.updateOne(
      { user: user },
      { $pull: { followers: req.user } }
    );

    res.status(200).json({
      data: {
        type: "success",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        type: "error",
        message: "No users found",
      },
    });
  }
});

/**
 * @description Get all the following
 * @route /user/friend/follow/list
 */

router.get("/following/list", verify, async (req, res) => {
  try {
    const doc = await Following.findOne({ user: req.user });
    res.status(200).json({
      data: {
        type: "success",
        following: doc ? doc.following : [],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        type: "error",
        message: "No users found",
      },
    });
  }
});

/**
 * @description Get Followers/Following count
 * @route /user/friend/count
 */

router.get("/count", verify, async (req, res) => {
  try {
    const followers = await Followers.findOne({ user: req.user }).count();
    const following = await Following.findOne({ user: req.user }).count();
    res.status(200).json({
      data: {
        type: "success",
        followers,
        following,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        type: "error",
        message: "No users found",
      },
    });
  }
});
module.exports = router;
