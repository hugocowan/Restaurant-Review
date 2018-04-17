const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  rating: {type: Number, min: 1, max: 5, default: 3},
  comments: {type: String},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Review', reviewSchema);
