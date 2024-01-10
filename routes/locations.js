var express = require('express');
var router = express.Router();
var isAuthenticated = require ("../middleware/isAuthenticated")

// GET  - Retrieves all of the posts for a given location
router.get("location/:locationId/posts", isAuthenticated, (req, res) => {
    Location.findById(req.params.locationId)
      .then((posts) => {
        console.log("Retrieved posts => ", posts);
        res.status(200).json(posts);
      })
      .catch((err) => {
        console.log("Error while retrieving posts => ", err);
        res.status(500).json({ err: "Failed to retrieve posts" });
      });
  });

  module.exports = router;