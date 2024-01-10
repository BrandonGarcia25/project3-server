const User = require("../models/User");

const isOwner = (req, res, next) => {
  User.findById(req.params.userId)
    .then((foundUser) => {
      if (foundUser === req.user._id) {
        next();
      } else {
        res.status(401).json({
          message: "You are not authorized to perform this operation",
        });
      }
    })
    .catch((err) => console.log(err));
};

module.exports = isOwner;
