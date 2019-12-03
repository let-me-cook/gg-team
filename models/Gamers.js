const Schema = require("mongoose").Schema;

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
  games: {
    type: Schema.Types.ObjectId,  
    refer: "Games"
  },
  teams: {
    type: Schema.Types.ObjectId,
    refer: "Teams"
  },
  date_created: {
    type: Date,
    default: Date.now()
  }
});

const Gamers = mongoose.model("Gamers", gamersSchema);

module.exports = Gamers;
