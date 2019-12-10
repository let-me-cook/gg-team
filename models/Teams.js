const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const gamersGameSchema = require("./GamersGameSchema");
const gamersTeamSchema = require("./GamersTeamSchema");
const Games = require("./Games");

var teamsSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tipe: {
    type: String,
    enum: ["Public", "Private"],
    required: true
  },
  description: {
    type: String
  },
  game: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Games"
  },
  players: [gamersTeamSchema]
});
  
teamsSchema.plugin(autoIncrement.plugin, { model: "Teams", field: "id" });

const Teams = mongoose.model("Teams", teamsSchema, "teams");

// Games.findOne({ name: "DOTA 2" }).then((game, err) => {
  
//   new Teams({
//     name: "YO I",
//     tipe: "Public",
//     game: game._id
//   }).save((err) => {
//     if (err) throw err;
//   })
// });

module.exports = Teams;
