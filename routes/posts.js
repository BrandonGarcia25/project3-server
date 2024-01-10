const express = require("express");
const Post = require("../models/Post");

var isAuthenticated = require ("../middleware/isAuthenticated")
var router = express.Router();

/* GET users listing. */

// POST - Creates a new post
router
  .post("/", isAuthenticated, (req, res) => {
    Post.create({
      photo: req.body.firstname,
      video: req.body.video,
      location: req.body.location,
      views: req.body.location,
      likes: req.body.location,
      caption: req.body.caption,
      comments: req.body.comments,
    })
    .then((createdPost) => {
        console.log("Created post ->", createdPost);
        res.status(201).json(createdPost);
      })
      .catch((error) => {
        console.error("Error while creating post ->", error);
        res.status(500).json({ error: "Failed to create the post" });
      });
  })
  

// GET - retrieves a specific post by id
router.get("/:postId", isAuthenticated, (req, res) => {
  Post.findById(req.params.postId)
    .populate("location")
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ err: "Failed" });
    });
});

// PUT - Updates a specific spot by id
router.put("/:postId", isAuthenticated, (req, res) => {
  Post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
    .then((updatedPost) => {
      console.log(updatedPost);
      res.status(200).send(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// DELETE - Deletes a specific post by id
router.delete("/:postId", isAuthenticated, (req, res) => {
  Post.findByIdAndDelete(req.params.postId)
    .then((result) => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(500).json({ err: "Deleting post failed" });
    });
});

module.exports = router;
