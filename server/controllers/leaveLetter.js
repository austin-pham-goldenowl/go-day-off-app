const express = require("express");
const Router = express.Router();

/**
 * Models
 */
// const leaveLetterModel = require("../models/leaveLetter");
// const rejectLetterDetailModel = require("../models/rejectedLetter");

Router.get("/:id", (req, res) => {
  res.json({
    msg: "GET letter with :id worked"
  });
});

Router.get("/all", (req, res) => {
  res.json({
    msg: "GET all letters with :id worked"
  });
});

Router.post("/", (req, res) => {
  res.json({
    msg: "POST new letter worked"
  });
});

Router.patch("/:id", (req, res) => {
  res.json({
    msg: "PATCH letter's info with ID worked"
  });
});

module.exports = Router;
