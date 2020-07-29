const verify = require("../middlewares/verify");
const express = require("express");
const router = express.Router();

/**
 * @description Follow a user
 * @description /user/friend/follow
 */

router.post("/", verify, (req, res) => {
  res.send("success");
});

module.exports = router;
