const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const Teams = require("../models/Teams")

router.get("/teams", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.find({}).then((teams, err) => {
      if (err) throw err;

      if (!teams) {
        req.flash("infos", "List Team Kosong");
        return res.render("search/teams", {
          infos: req.flash("infos")
        });
      }
      return res.render("search/teams", {
        teams
      });
    });
  } else {
    return res.redirect("login");
  }
});

module.exports = router;
