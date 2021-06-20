const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema 

const opts = { toObject: { virtuals: true }, toJSON: { virtuals: true } };
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
  opts
});
PersonSchema.virtual('user_id').get(function () {
  return this.email
})
module.exports = mongoose.model('Person', PersonSchema);