const router = require("express").Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.find()
    .then((foundUsers) => res.status(200).json(foundUsers))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .populate({
      path: "posts",
      populate: {
        path: "createdByUser",
        select: "_id profileImage username",
      },
    })
    .populate({
      path: "followers",
      select: "profileImage username",
    })
    .populate({
      path: "following",
      select: "profileImage username",
    })
    .then((foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "User not found" });
    });
});

router.put("/:userId", isAuthenticated, isOwner, (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId)
    .then((foundUser) => {
      console.log("Found user ->", foundUser);
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Updating user failed" });
    });
});

router.delete("/:userId", isAuthenticated, isOwner, (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
    .then((foundUser) => {
      res.status(204).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Deleting user failed" });
    });
});

module.exports = router;

// .populate({
//   path: "comment",
//   populate: {
//     path: "user",
//   },
// })
