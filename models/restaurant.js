const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  rating: {type: Number, min: 1, max: 5, default: 3},
  comments: {type: String},
  restaurant: {type: mongoose.Schema.ObjectId, ref: 'Restaurant'},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

const restaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  location: String,
  phone: String,
  email: String,
  website: String,
  food: [{type: String}],
  // photos: [{type: mongoose.Schema.ObjectId, ref: 'Photo'}],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
