const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const gamersGameSchema = require("./SchemaGamersGames");
const gamersTeamSchema = require("./SchemaGamersTeams");

var gamesSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  relevantNumber: {
    type: String
  },
  hasAPI: {
    type: Boolean
  },
  partyMax: {
    type: Number
  },
  partyMin: {
    type: Number
  }
});

const Games = mongoose.model("Games", gamesSchema, "games");

module.exports = Games;
