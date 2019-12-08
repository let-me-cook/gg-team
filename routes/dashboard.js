const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");


router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.render("dashboard", {
      username: req.session.uname
    })
  } else {
    return res.redirect("login");
  }
});

module.exports = router;