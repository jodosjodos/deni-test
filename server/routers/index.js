const express = require("express");
const RouterIndex = express.Router();
const fs = require("fs");
const path = require("path");

const PAGE_SIZE = 5;
//  get feeds
RouterIndex.get("/feeds", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const feeds = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "feed.json"), "utf8")
    );
    const paginatedItems = feeds.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );
    res.status(200).json(paginatedItems);
  } catch (error) {
    return res.status(404).json({ msg: " something went wrong", error });
  }
});

// get comments
RouterIndex.get("/comments/:briefref", (req, res) => {
  try {
    const { briefref } = req.params;
    const comments = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "comments.json"),
        "utf8"
      )
    );
    const filteredComments = comments.filter(
      (comment) => comment.briefref === briefref
    );
    res.json(filteredComments);
  } catch (error) {
    return res.status(404).json({ msg: " something went wrong", error });
  }
});
module.exports = RouterIndex;
