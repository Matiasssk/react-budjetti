const express = require("express");
const createUser = require("../controllers/createUser");
const createRouter = express.Router();

createRouter.post("/", createUser.addUser);

module.exports = createRouter;
