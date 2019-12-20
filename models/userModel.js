const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required.'],
    validate: [validator.isEmail, 'Enter a valid Email'],
    unique: true
  },
  Contact_Number: {
    type: Number,
    required: true
  },
  Course_Level: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  Country_Pref: {
    type: [String],
    required: true,
    trim: true
  },
  DOB: {
    type: Date
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
