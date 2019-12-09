const Schema = require("mongoose").Schema;

var gamersTeamSchema = new Schema({
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
    enum: ["Public", "Private"],
    required: true
  }
});

module.exports = gamersTeamSchema;