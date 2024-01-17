const router = require("express").Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

//Get-Read All Posts - posts/
router.get("/", isAuthenticated, (req, res) => {
  Post.find()
    .populate({
      path: "createdByUser",
      select: "_id username profileImage",
    })
    .then((foundPosts) => {
      res.json(foundPosts);
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST - Creates a new post - posts/
router.post("/", isAuthenticated, (req, res) => {
  Post.create({
    createdByUser: req.user._id,
    media: req.body.media,
    location: req.body.location,
    caption: req.body.caption,
    likes: req.body.likes,
    comments: req.body.comments,
  })
    .then((createdPost) => {
      console.log("Created post ->", createdPost);
      User.findByIdAndUpdate(req.user._id, {
        $push: { posts: createdPost._id },
      }).then(res.status(201).json(createdPost));
    })
    .catch((error) => {
      console.error("Error while creating post ->", error);
      res.status(500).json({ error: "Failed to create the post" });
    });
});

// GET - retrieves a specific post by id
router.get("/:postId", isAuthenticated, (req, res) => {
  Post.findById(req.params.postId)
    .populate("createdByUser")
    .populate({
      path: "likes",
      select: "_id profileImage username",
    })
    .populate({
      path: "comments",
      select: "_id comment",
      populate: {
        path: "createdByUser",
        select: "_id profileImage username",
      },
    })
    .then((post) => {
      const {
        _id: postId,
        createdByUser: { _id: userId, username },
        media,
        location,
        caption,
        likes,
        createdAt,
        comments,
      } = post;
      const response = {
        postId,
        createdByUser: { userId, username },
        media,
        location,
        caption,
        likes,
        createdAt,
        comments,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
});

// POST - Creates a new comment for a specific post
router.post("/:postId/comments", isAuthenticated, (req, res) => {
  Comment.create({
    createdByUser: req.user._id,
    comment: req.body.comment,
  })
    .then((createdComment) => {
      Post.findByIdAndUpdate(req.params.postId, {
        $push: { comments: createdComment._id },
      }).then(res.status(201).json(createdComment));
    })
    .catch((err) => {
      console.error("Error while creating comment ->", err);
      res.status(500).json({ error: "Failed to create comment" });
    });
});

// PUT - Updates a specific post by id
router.put("/:postId", isAuthenticated, isOwner, (req, res) => {
  Post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
    .then((updatedPost) => {
      res.status(200).send(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// DELETE - Deletes a specific post by id
router.delete("/:postId", isAuthenticated, isOwner, (req, res) => {
  Post.findByIdAndDelete(req.params.postId)
    .then((result) => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(500).json({ err: "Deleting post failed" });
    });
});

module.exports = router;
