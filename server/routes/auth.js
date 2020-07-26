const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

/**
 * @description User sign up
 * @route /auth/signup
 */

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(422).json({
      message: {
        type: "error",
        body: "All the fields are required",
      },
    });
  }

  // Find is email already exists in database

  const user = await User.findOne({ email: email });
  if (!user) {
    const hashedPassword = await bcrypt
      .hash(password, 10)
      .then((hash) => {
        return hash;
      })
      .catch((err) => console.log(err));

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save().catch((err) => {
      console.log("Error in saving user" + err);
      return res.status(500).json({
        message: {
          type: "error",
          body: "Internal Server error. Please Try again Later",
        },
      });
    });

    return res.status(200).json({
      message: {
        type: "success",
        body: "Welcome to social app",
      },
    });
  } else {
    return res.status(422).json({
      message: {
        type: "error",
        body: "The following email is already registered",
      },
    });
  }
});

/**
 * @description User Login
 * @route /auth/login
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        // create JSON Web Token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
        const posts = await Post.find({ postedBy: user._id })
          .populate("postedBy")
          .sort({ datePosted: -1 });

        return res.status(200).json({
          data: {
            type: "success",
            message: "Sucessfully signed in",
            token,
            user,
            posts,
          },
        });
      } else {
        return res.status(422).json({
          data: {
            type: "error",
            message: "Please check your credentials and try again",
          },
        });
      }
    } else {
      res.status(422).json({
        data: {
          type: "error",
          message: "Please check your credentials and try again",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
