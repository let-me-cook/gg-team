const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const Teams = require("../models/Teams")

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.render("dashboard", {
      username: req.session.data.uname
    });
  } else {
    req.flash("infos", "Mohon Login Terlebih Dahulu");
    // console.log("dari dash", req.flash("infos"));
    return res.redirect("/login");
  }
});


module.exports = router;
