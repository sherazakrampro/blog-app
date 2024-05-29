const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
