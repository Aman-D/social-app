const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verify = (req, res, next) => {
  //extracting the token from the header

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      type: "error",
      body: "Please login to continue",
    });
  } else {
    //taking the token part from authorization
    const token = authorization.replace("Bearer ", "");

    //verifying the token
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          type: "error",
          body: "Please login to continue",
        });
      } else {
        const { _id } = payload;
        console.log(_id);
        User.findById(_id)
          .then((user) => {
            if (user) {
              req.user = user;
              next();
            } else {
              return res.status(500).json({
                type: "error",
                body: "Internal Server Error",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }
};

module.exports = verify;
