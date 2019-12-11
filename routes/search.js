const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const Teams = require("../models/Teams");
const Games = require("../models/Games");

router.get("/teams", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.find({})
      .populate({ path: "game", select: "name partyMAX partyMIN -_id" })
      .populate({ path: "players captain", select: "uname -_id" })
      .then((teams, err) => {
        if (err) throw err;

        return res.render("search/teams", {
          teams,
          infos: req.flash("infos")
        });
      });
  } else {
    return res.redirect("/login");
  }
});

router.post("/teams", (req, res) => {
  if (req.session.isAuthenticated) {
    errors = [];

    if (!(req.body.teamname && req.body.tipe && req.body.game)) {
      errors.push("Nama, Tipe, atau Game Tim tidak boleh kosong");

      req.flash("infos", errors);

      return res.redirect("/search/teams");
    }

    Teams.findOne({ name: req.body.teamname }).then((team, err) => {
      if (err) throw err;

      console.log(req.body);

      if (team) {
        req.flash("infos", "Nama Team Sudah Ada");
        return res.redirect("/search/teams");
      }

      Games.findOne({ name: req.body.game }).then(game => {
        new Teams({
          name: req.body.teamname,
          tipe: req.body.tipe,
          game: game._id,
          description: req.body.description,
          captain: req.session.data._id,
          players: [req.session.data._id],
          playerCount: 1
        }).save((err, newTeam) => {
          if (err) console.log(err);

          Gamers.findOneAndUpdate(
            { _id: req.session.data._id },
            { $push: { teams: newTeam._id } },
            (updatedGamer, err) => {
              if (err) console.log(err);

              console.log(updatedGamer);

              return res.redirect("/search/teams");
            }
          );
        });
      });
    });
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
