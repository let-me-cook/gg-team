const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const Teams = require("../models/Teams");
const Games = require("../models/Games");

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    Gamers.findById(req.session.data._id)
      .populate({ path: "games.game", select: "name -_id" })
      .populate({ path: "teams.team", select: "name messages agenda role  -_id" })
      .then((gamer, err) => {
        if (err) throw err;

        return res.render("dashboard", {
          gamer: gamer
        });
      });
  } else {
    req.flash("infos", "Mohon Login Terlebih Dahulu");
    // console.log("dari dash", req.flash("infos"));
    return res.redirect("/login");
  }
});

router.post("/:game", (req, res) => {
  if (req.session.isAuthenticated) {
    Gamers.findById(req.session.data._id)
      .populate({ path: "games", select: "name -_id" })
      .populate({ path: "teams", select: "name messages -_id" })
      .then((gamer, err) => {
        if (err) throw err;

        Games.findOne({ name: req.params.game })
        .then((game, err) => {
          if (err) throw err;

          gamer.games.push({
            game: game._id,
            relevantPoint: req.body.revPoint,
            relevantLink: req.body.revLink,
            isset: true
          });

          gamer.save().then((savedGame, err) => {
            if (err) throw err;

            return res.redirect("/dashboard");
          });
        });
      });
  } else {
    req.flash("infos", "Mohon Login Terlebih Dahulu");
    // console.log("dari dash", req.flash("infos"));
    return res.redirect("/login");
  }
});

module.exports = router;
