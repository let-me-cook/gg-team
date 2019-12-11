const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index/index");
});

router.get("/about", (req, res) => {
  res.render("index/about");
});

router.get("/faq", (req, res) => {
  res.render("index/faq");
});


module.exports = router;
