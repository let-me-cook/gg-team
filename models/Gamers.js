const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const gamersGameSchema = require("./SchemaGamersGames");
const Teams = require("./Teams");

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
  games: [
    {
      game: {
        type: Schema.Types.ObjectId,
        ref: "Games"
      },
      relevantPoint: {
        type: Number
      },
      relevantLink: {
        type: String
      },
      isset: {
        type: Boolean
      }
    }
  ],
  teams: [
    {
      team: {
        type: Schema.Types.ObjectId,
        ref: "Teams"
      },
      role: {
        type: String
      }
    }
  ],
  notifications: [String],
  date_created: {
    type: Date,
    default: Date.now()
  }
});

gamersSchema.plugin(autoIncrement.plugin, { model: "Gamers", field: "id" });

const Gamers = mongoose.model("Gamers", gamersSchema, "gamers");

module.exports = Gamers;
