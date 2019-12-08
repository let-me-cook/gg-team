const Schema = require("mongoose").Schema;

var gamesSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    require: True
  },
  hasAPI: {
    type: Boolean,
  }

});

const Games = mongoose.model("Games", gamesSchema, "games");

module.exports = Games;