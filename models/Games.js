const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const gamersGameSchema = require("./GamersGameSchema");
const gamersTeamSchema = require("./GamersTeamSchema");

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
