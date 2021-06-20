const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema 
const PersonSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    trim: true
  },
  subscription: {
    type: String,
    enum: {
      values: ['standard', 'gold', 'diamond'],
      message: '{VALUE} is not supported. (Please choose one among standard/gold/diamond )'
    },
    default: "standard",
    trim: true
  },
});

module.exports = mongoose.model('Person', PersonSchema);