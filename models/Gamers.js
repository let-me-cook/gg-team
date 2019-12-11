const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const gamersGameSchema = require("./SchemaGamersGames");
const gamersTeamSchema = require("./SchemaGamersTeams");

var gamersSchema = new Schema({
  id: {
    type: String
  },
  uname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  games: [gamersGameSchema],
  teams: [gamersTeamSchema],
  notifications: [String],
  date_created: {
    type: Date,
    default: Date.now()
  }
});

gamersSchema.plugin(autoIncrement.plugin, { model: "Gamers", field: "id" });

const Gamers = mongoose.model("Gamers", gamersSchema, "gamers");

module.exports = Gamers;
