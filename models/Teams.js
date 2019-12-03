const Schema = require("mongoose").Schema;

var teamsSchema = new Schema({
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

const Teams = mongoose.model("Teams", teamsSchema);

module.exports = Teams;
