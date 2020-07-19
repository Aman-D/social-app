const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verify");

/**
 * @description Home Page
 * @route GET /
 * Authorization required
 */

router.get("/", verify, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

module.exports = router;
