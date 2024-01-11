const router = require("express").Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

const Comment = require("../models/Comment");

router.put("/:commentId", isAuthenticated, isOwner, (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true })
    .then((updatedComment) => {
      console.log("Updated comment ->", updatedComment);
      res.status(201).json(updatedComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Unable to update comment" });
    });
});

router.delete("/:commentId", isAuthenticated, isOwner, (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId)
    .then((deletedComment) => {
      console.log("Deleted comment ->", deletedComment);
      res.status(204).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Unable to delete comment" });
    });
});

module.exports = router;
