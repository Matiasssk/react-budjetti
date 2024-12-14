const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const feedbackRouter = express.Router();

feedbackRouter.post("/", feedbackController.addFeedback);
feedbackRouter.get("/", feedbackController.getFeedback);
module.exports = feedbackRouter;
