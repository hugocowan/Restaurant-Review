const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const reviewSchema = new mongoose.Schema({
  title: String,
  rating: {type: Number, min: 1, max: 5, default: 3},
  comments: [{type: String}],
  restaurant: {type: mongoose.Schema.ObjectId, ref: 'Restaurant'},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Review', reviewSchema);
