const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

// Sign Up Route
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.render("signup", {
      error: "Please fill all the fields",
    });
  }
  await User.create({ fullName, email, password });
  return res.redirect("/user/signin");
});

// Sign In Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("signin", {
      error: "Please fill all the fields",
    });
  }
  try {
    const token = await User.matchPasswordAndCreateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signin", {
      error: "Invalid email or password",
    });
  }
});

module.exports = router;
