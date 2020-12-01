const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    max: 25,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  }
});

module.exports = mongoose.model('Auth', authSchema)
