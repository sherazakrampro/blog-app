const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

module.exports = router;
