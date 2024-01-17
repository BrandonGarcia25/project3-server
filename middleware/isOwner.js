const User = require("../models/User");

const isOwner = (req, res, next) => {
  User.findById(req.user._id)
    .then((foundUser) => {
      if (foundUser && foundUser._id.equals(req.user._id)) {
        next();
      } else {
        res.status(401).json({
          message: "You are not authorized to perform this operation",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = isOwner;
