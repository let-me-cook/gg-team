const Schema = require("mongoose").Schema;
const Games =  require("./Games");

var gamersGameSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Games"
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

module.exports = gamersGameSchema;