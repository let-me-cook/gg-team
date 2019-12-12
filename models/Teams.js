const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Gamers = require("./SchemaGamersGames");
const Games = require("./Games");

var teamsSchema = new Schema({
  id: {
    type: Number
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
  captain: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Gamers"
  },
  totalRelevantPoint: {
    type: Number
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gamers"
    }
  ],
  playerCount: {
    type: Number,
    default: 0
  },
  messages: [String],
  joinsRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gamers"
    }
  ]
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
