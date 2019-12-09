const Schema = require("mongoose").Schema;

var gamersGameSchema = new Schema({
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

module.exports = gamersGameSchema;