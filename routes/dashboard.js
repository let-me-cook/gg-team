const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.render("dashboard", {
      username: req.session.uname
    });
  } else {
    req.flash('infos', "Mohon Login Terlebih Dahulu");
    // console.log("dari dash", req.flash("infos"));
    return res.redirect("login");
  }
});

router.get("/findteam", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.render("findteam");
  } else {
    return res.redirect("login");
  }
});

module.exports = router;
