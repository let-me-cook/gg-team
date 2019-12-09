const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const gamersGameSchema = require("./GamersGameSchema");
const gamersTeamSchema = require("./GamersTeamSchema");

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
  notification: [String],
  date_created: {
    type: Date,
    default: Date.now()
  }
});

gamersSchema.plugin(autoIncrement.plugin, { model: "Gamers", field: "id" });

const Gamers = mongoose.model("Gamers", gamersSchema, "gamers");

module.exports = Gamers;
