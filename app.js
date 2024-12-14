require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");
const loginRouter = require("./controllers/login");

const app = express();
const feedbackRouter = require("./routes/feedbackRouter");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/palaute", feedbackRouter);

app.use("/api/login", loginRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Jokin meni pieleen");
});

module.exports = app;
