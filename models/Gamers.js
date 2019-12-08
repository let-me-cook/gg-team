const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment")

var gamersToGameSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stats: {
    playerId: {
      type: String,
      required: false
    },
    relevantRank: {
      type: String,
      required: false
    }
  }
});

var gamersToTeamSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tipe: {
    type: String,
    enum: ["Casual", "Ranked", "Professional"],
    required: true
  }
});

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
  games: [gamersToGameSchema],
  teams: [gamersToTeamSchema],
  date_created: {
    type: Date,
    default: Date.now()
  }
});

gamersSchema.plugin(autoIncrement.plugin, { model: 'Gamers', field: 'id' });

const Gamers = mongoose.model("Gamers", gamersSchema, "gamers");

module.exports = Gamers;
