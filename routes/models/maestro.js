const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; 

// User's Atributes
const maestroPSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  iglesia: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordC: {
    type: String,
    required: true,
  },
  student: {
    type: [ObjectId],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

const maestro = mongoose.model("Maestro", maestroPSchema);
module.exports = maestro;