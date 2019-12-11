const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const Teams = require("../models/Teams")

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    return res.render("dashboard", {
      username: req.session.uname
    });
  } else {
    req.flash("infos", "Mohon Login Terlebih Dahulu");
    // console.log("dari dash", req.flash("infos"));
    return res.redirect("/login");
  }
});

router.get("/findteam", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.find({}).then((teams, err) => {
      if (err) throw err;

      if (!teams) {
        req.flash("infos", "List Team Kosong");
        return res.render("findteam", {
          infos: req.flash("infos")
        });
      }
      return res.render("findteam", {
        teams
      });
    });
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
