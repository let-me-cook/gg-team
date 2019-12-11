const express = require("express");
const router = express.Router();
const Teams = require("../../models/Teams");
const Games = require("../../models/Games");

router.get("/", (req, res) => {
  Teams.find({})
    .populate({ path: "game", select: "name partyMAX partyMIN -_id" })
    .populate({ path: "players captain", select: "uname -_id" })
    .then((teams, err) => {
      teams.filter(team => {
        return team.game === req.query.game
          ? req.query.game
          : team.game && team.tipe === req.query.tipe
          ? req.query.tipe
          : team.tipe &&
            team.totalRelevantPoint / team.playerCount >= req.query.minPoint
          ? req.query.minPoint
          : team.averageRelevantPoint && team.playerCount > req.query.maxPlayer
          ? req.query.maxPlayer
          : team.playerCount;
      });
      res.json(teams);
    });
});

// GET Specific Team by ID
router.get("/:id", (req, res) => {
  Teams.findOne({ id: req.params.id })
    .populate("game")
    .then(team => {
      res.json(team);
    })
    .catch(err => console.log(err));
});

// Update Gamer by PUT with ID and JSON
router.put("/:id", (req, res) => {
  const found = gamers.some(gamer => gamer.id === parseInt(req.params.id));

  if (found) {
    const updateGamer = req.body;

    gamers.forEach(gamer => {
      if (gamer.uname === parseInt(req.params.uname)) {
        gamer.uname = updateGamer ? updateGamer.name : gamer.name;
        gamer.email = updateGamer ? updateGamer.email : gamer.email;
        gamer.game = updateGamer ? updateGamer.game : gamer.game;

        res.json({ msg: "Gamer Updated ", gamer });
      }
    });
  } else {
    res.status(400).json({ msg: `Gamer ${req.params.id} not found` });
  }
});

// DELETE Gamer By ID
router.delete("/:id", (req, res) => {
  const found = gamers.some(gamer => gamer.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Gamer deleted",
      gamers: gamers.filter(gamer => gamer.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `gamer ${req.params.id} not found` });
  }
});

// GET All Teams
// router.get("/", (req, res) => {
//   console.log(req.query);

//   req.query.game ? null : delete req.query["game"];
//   req.query.tipe ? null : delete req.query["tipe"];
//   req.query.min
//     ? (req.query.averageRelevantPoint = { $gt: req.query.min })
//     : null;
//   req.query.penuh ? (req.query.playerCount = { $lt: req.query.penuh }) : null;

//   delete req.query["min"];
//   delete req.query["penuh"];

//   Games.findOne(req.query.game)
//     .then(game => {
//       if (game) {
//         req.query.game = game._id;
//       }
//     })
//     .then(() => {
//       Teams.find(req.query)
//         .populate("game")
//         .then(team => {
//           res.json(team);
//         })
//         .catch(err => console.log(err));
//     });
// });

module.exports = router;
