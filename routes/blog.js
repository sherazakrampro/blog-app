const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");

const router = express.Router();

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  res.render("blog", {
    blog,
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
