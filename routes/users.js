const router = require("express").Router();

const User = require("../models/User");

const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

router.get("/", (req, res, next) => {
  User.find()
    .then((foundUsers) => res.status(200).json(foundUsers))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
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
