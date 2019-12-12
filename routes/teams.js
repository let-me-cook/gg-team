const express = require("express");
const router = express.Router();
const Gamers = require("../models/Gamers");
const Teams = require("../models/Teams");
const Games = require("../models/Games");

router.get("/:id", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "game", select: "name partyMAX partyMIN -_id" })
      .populate({
        path: "players captain joinsRequest",
        select: "uname id _id"
      })
      .then((team, err) => {
        if (err) throw err;

        return res.render("teams", {
          team,
          infos: req.flash("infos"),
          isCaptain: team.captain._id == req.session.data._id
        });
      });
  } else {
    return res.redirect("/login");
  }
});

router.get("/", (req, res) => {
  if (req.session.isAuthenticated) {
    Gamers.findById(req.session.data._id)
      .populate({
        path: "teams.team",
        populate: {
          path: "game"
        }
      })
      .then((gamer, err) => {
        if (err) throw err;

        // return res.send(gamer.teams);
        return res.render("myteams", {
          teams: gamer.teams
        });
      });
  } else {
    req.flash("infos", "Mohon Login Terlebih Dahulu");
    // console.log("dari dash", req.flash("infos"));
    return res.redirect("/login");
  }
});

router.post("/:id/join", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "game", select: "name partyMAX partyMIN -_id" })
      .populate({ path: "players captain", select: "uname _id" })
      .then((team, err) => {
        if (err) throw err;

        if (team.playerCount < team.game.partyMax) {
          req.flash("infos", "Team sudah penuh");
          return res.redirect("/search/teams");
        }

        if (
          team.players.some(player => {
            return player._id == req.session.data._id;
          })
        ) {
          req.flash("infos", "Anda sudah menjoin tim ini");

          return res.redirect("/search/teams");
        }

        if (team.tipe == "Private") {
          if (
            team.joinsRequest.some(player => {
              return player._id == req.session.data._id;
            })
          ) {
            req.flash(
              "infos",
              "Anda sudah melakukan request masuk pada tim ini"
            );

            return res.redirect("/search/teams");
          }

          team.joinsRequest.push(req.session.data._id);

          team.save().then((newTeam, err) => {
            if (err) throw err;

            req.flash("infos", "Request untuk join telah dilakukan");
            return res.redirect("/search/teams");
          });
        } else {
          team.players.push(req.session.data._id);
          team.playerCount++;

          team.save().then((editedTeam, err) => {
            if (err) throw err;

            Gamers.findById(req.session.data._id).then((gamer, err) => {
              if (err) throw err;

              gamer.teams.push({ team: editedTeam._id, role: "Anggota" });

              gamer.save().then((editedGamer, err) => {
                if (err) throw err;

                req.flash("infos", "Anda telah masuk di team ini");

                return res.redirect("/teams/" + req.params.id);
              });
            });
          });
        }
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    return res.redirect("/login");
  }
});

router.post("/:id/leave", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "game", select: "name partyMAX partyMIN -_id" })
      .populate({ path: "players captain", select: "uname _id" })
      .then((team, err) => {
        if (err) throw err;

        if (
          team.players.some(player => {
            return player.id == req.params.id;
          })
        ) {
          req.flash("infos", "Anda bukan anggota tim ini");

          req.redirect("/search/teams");
        }

        team.players = team.players.filter(gamer => {
          return gamer.id != req.params.id_gamer;
        });

        team.playerCount = team.players.length;

        team.save().then((savedTeam, err) => {
          if (err) throw err;

          req.flash("infos", "Anda telah keluar dari grup");

          return res.redirect("/search/team");
        });
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    return res.redirect("/login");
  }
});

router.post("/:id/message", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "players captain", select: "uname _id" })
      .then((team, err) => {
        if (err) throw err;

        if (req.session.data._id == team.captain._id) {
          team.messages.push(
            team.name + "." + team.captain.uname + " : " + req.body.message
          );
        }

        team.save().then((savedTeam, err) => {
          if (err) throw err;

          return res.redirect("/teams/" + req.params.id);
        });
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    return res.redirect("/login");
  }
});

router.post("/:id/accept/:id_gamer", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "players captain", select: "uname id _id" })
      .then((team, err) => {
        if (err) throw err;

        if (req.session.data._id == team.captain._id) {
          Gamers.findOne({ id: req.params.id_gamer }).then((gamer, err) => {
            if (err) throw err;

            team.players.push(gamer._id);
            team.joinsRequest = team.joinsRequest.filter(gamer => {
              return gamer.id == req.params.id_gamer;
            });
            team.playerCount++;

            team.save().then((savedTeam, err) => {
              if (err) throw err;

              gamer.teams.push({ team: savedTeam._id, role: "Anggota" });

              return res.redirect("/teams/" + req.params.id);
            });
          });
        }
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    return res.redirect("/login");
  }
});

router.post("/:id/decline/:id_gamer", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "players captain", select: "uname id _id" })
      .then((team, err) => {
        if (err) throw err;

        if (req.session.data._id == team.captain._id) {
          team.joinsRequest = team.joinsRequest.filter(gamer => {
            return gamer.id != req.params.id_gamer;
          });

          team.save().then((savedTeam, err) => {
            if (err) throw err;

            return res.redirect("/teams/" + req.params.id);
          });
        }
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    return res.redirect("/login");
  }
});

router.post("/:id/kick/:id_gamer", (req, res) => {
  if (req.session.isAuthenticated) {
    Teams.findOne({ id: req.params.id })
      .populate({ path: "players captain", select: "uname id _id" })
      .then((team, err) => {
        if (err) throw err;

        if (req.session.data._id == team.captain._id) {
          team.players = team.players.filter(gamer => {
            return gamer.id != req.params.id_gamer;
          });

          team.playerCount = team.players.length;

          team.save().then((savedTeam, err) => {
            if (err) throw err;

            console.log(savedTeam);
            return res.redirect("/teams/" + req.params.id);
          });
        }
      })
      .catch(err => {
        if (err) throw err;
      });
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
