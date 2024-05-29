require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
