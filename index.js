require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MongoURL = process.env.MONGODB_CONNECTION_STRING;

mongoose
  .connect(MongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
