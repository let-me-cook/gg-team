const Schema = require("mongoose").Schema;

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
    type: Number,
    required: true
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
  teams: [gamersToGameSchema],
  date_created: {
    type: Date,
    default: Date.now()
  }
});

const Gamers = mongoose.model("Gamers", gamersSchema, "gg-team");

module.exports = Gamers;
