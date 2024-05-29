const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.render("signup", {
      errorMessage: "Please fill all the fields",
    });
  }
  await User.create({ fullName, email, password });
  return res.redirect("/user/signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("signin", {
      errorMessage: "Please fill all the fields",
    });
  }
  const user = await User.matchPassword(email, password);
  console.log(user);
  return res.redirect("/");
});

module.exports = router;
