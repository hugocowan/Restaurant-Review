const mongoose = require('mongoose');

// const photo = require('./photo');

const restaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  location: String,
  phone: String,
  email: String,
  website: String,
  food: [{type: String}],
  // photos: [{type: mongoose.Schema.ObjectId, ref: 'Photo'}],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
